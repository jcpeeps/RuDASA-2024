import React, { useEffect, useMemo, useRef, useState } from 'react'
import 'leaflet/dist/leaflet.css'
import { SA_BOUNDS, makeMarker } from './memberMapParts'
import { deriveScope, facilityLabel } from './memberMapData'
import MemberMapView from './MemberMapView'

// Map logic. What the visitor sees is built in MemberMapView.jsx.
export default function MemberMap() {
    const mapEl      = useRef(null)
    const mapRef     = useRef(null)
    const layerRef   = useRef(null)
    const leafletRef = useRef(null)
    const tilesRef   = useRef({})
    const markersRef = useRef({})

    const [data, setData]           = useState(null)
    const [error, setError]         = useState(false)
    const [ready, setReady]         = useState(false)
    const [province, setProvince]   = useState("All")
    const [district, setDistrict]   = useState("All")
    const [showBig, setShowBig]     = useState(true)
    const [showSmall, setShowSmall] = useState(true)
    const [satellite, setSatellite] = useState(false)
    const [search, setSearch]       = useState("")
    const [focus, setFocus]         = useState(null)

    const inScope = p => (province === "All" || p.province === province) && (district === "All" || p.district === district)

    // Every facility, found by its label (used by the search box)
    const byLabel = useMemo(() => {
        const m = {}
        if (data) data.points.forEach(p => { m[facilityLabel(p)] = p })
        return m
    }, [data])

    // 1. Load data (an old-format or broken feed shows the polite message instead of crashing)
    useEffect(() => {
        let cancelled = false
        fetch('/api/member-map')
            .then(r => { if (!r.ok) throw new Error(); return r.json() })
            .then(d => { if (!d.provinces || !d.districts) throw new Error(); if (!cancelled) setData(d) })
            .catch(() => { if (!cancelled) setError(true) })
        return () => { cancelled = true }
    }, [])

    // 2. Create the map once the data (and therefore the map div) exists
    useEffect(() => {
        if (!data || mapRef.current) return
        let cancelled = false
        import('leaflet').then(mod => {
            if (cancelled || !mapEl.current) return
            const L = mod.default || mod
            leafletRef.current = L
            const map = L.map(mapEl.current, {
                scrollWheelZoom: false,        // never hijack page scrolling
                dragging: !L.Browser.mobile,   // on phones the page scrolls normally
                tap: false, zoomSnap: 0.25, minZoom: 4, maxZoom: 14
            })
            tilesRef.current = {
                street: L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                    maxZoom: 19
                }),
                satellite: L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
                    attribution: 'Tiles &copy; Esri', maxZoom: 18
                })
            }
            tilesRef.current.street.addTo(map)
            map.fitBounds(SA_BOUNDS)
            layerRef.current = L.layerGroup().addTo(map)
            mapRef.current = map
            setReady(true)
        })
        return () => { cancelled = true }
    }, [data])

    // 3. Street or satellite tiles
    useEffect(() => {
        if (!ready) return
        const map = mapRef.current
        const { street, satellite: sat } = tilesRef.current
        if (satellite) {
            if (map.hasLayer(street)) map.removeLayer(street)
            if (!map.hasLayer(sat)) sat.addTo(map)
        } else {
            if (map.hasLayer(sat)) map.removeLayer(sat)
            if (!map.hasLayer(street)) street.addTo(map)
        }
    }, [ready, satellite])

    // 4. Draw one pin for every facility in the current selection
    useEffect(() => {
        if (!ready || !data) return
        const L = leafletRef.current
        layerRef.current.clearLayers()
        markersRef.current = {}

        data.points.filter(inScope).filter(p => (p.count === null ? showSmall : showBig)).forEach(p => {
            const marker = makeMarker(L, p)
            marker.addTo(layerRef.current)
            markersRef.current[facilityLabel(p)] = marker
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ready, data, province, district, showBig, showSmall])

    // 5. Zoom to the selection (unless a single facility was searched for)
    useEffect(() => {
        if (!ready || !data || focus) return
        const coords = data.points.filter(inScope).map(p => [p.lat, p.lng])
        if (coords.length === 0 || (province === "All" && district === "All")) mapRef.current.fitBounds(SA_BOUNDS)
        else mapRef.current.fitBounds(coords, { padding: [50, 50], maxZoom: 9 })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ready, data, province, district, focus])

    // 6. Zoom to a searched facility and open its details
    useEffect(() => {
        if (!ready || !focus) return
        const p = byLabel[focus], m = markersRef.current[focus]
        if (!p || !m) return
        mapRef.current.setView([p.lat, p.lng], 11)
        m.openPopup()
    }, [ready, focus, byLabel, province, district, showBig, showSmall])

    // 7. Clean up on unmount
    useEffect(() => () => {
        if (mapRef.current) { mapRef.current.remove(); mapRef.current = null }
    }, [])

    const changeProvince = (v) => { setProvince(v); setDistrict("All"); setFocus(null); setSearch("") }
    const changeDistrict = (v) => { setDistrict(v); setFocus(null); setSearch("") }
    const changeSearch = (v) => {
        setSearch(v)
        const p = byLabel[v]
        if (p) {
            setProvince(p.province); setDistrict(p.district)
            if (p.count === null) setShowSmall(true); else setShowBig(true)
            setFocus(v)
        } else if (v === "") setFocus(null)
    }
    const reset = () => {
        setProvince("All"); setDistrict("All"); setShowBig(true); setShowSmall(true)
        setSatellite(false); setSearch(""); setFocus(null)
    }

    const scope = data ? deriveScope(data, province, district) : null
    const facilityLabels = data ? data.points.filter(inScope).map(facilityLabel).sort() : []

    return (
        <MemberMapView
            data={data} error={error} scope={scope} mapEl={mapEl}
            controls={{
                province, onProvince: changeProvince, district, onDistrict: changeDistrict,
                search, onSearch: changeSearch, facilityLabels,
                satellite, onSatellite: setSatellite,
                showBig, onShowBig: setShowBig, showSmall, onShowSmall: setShowSmall, onReset: reset
            }}
        />
    )
}

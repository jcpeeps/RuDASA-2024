import React, { useEffect, useRef, useState } from 'react'
import 'leaflet/dist/leaflet.css'
import { PROVINCE_COLOURS, SA_BOUNDS, esc, pinSvg } from './memberMapParts'
import MemberMapView from './MemberMapView'

// Map logic. What the visitor sees is built in MemberMapView.jsx.
export default function MemberMap() {
    const mapEl      = useRef(null)
    const mapRef     = useRef(null)
    const layerRef   = useRef(null)
    const leafletRef = useRef(null)
    const tilesRef   = useRef({})

    const [data, setData]                     = useState(null)
    const [error, setError]                   = useState(false)
    const [ready, setReady]                   = useState(false)
    const [province, setProvince]             = useState("All")
    const [showFacilities, setShowFacilities] = useState(true)
    const [showGrouped, setShowGrouped]       = useState(true)
    const [satellite, setSatellite]           = useState(false)

    // 1. Load data
    useEffect(() => {
        let cancelled = false
        fetch('/api/member-map')
            .then(r => { if (!r.ok) throw new Error(); return r.json() })
            .then(d => { if (!cancelled) setData(d) })
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
                tap: false,
                zoomSnap: 0.25,
                minZoom: 4,
                maxZoom: 12
            })

            tilesRef.current = {
                street: L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                    maxZoom: 19
                }),
                satellite: L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
                    attribution: 'Tiles &copy; Esri',
                    maxZoom: 18
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

    // 3. Switch between street and satellite tiles
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

    // 4. Draw pins whenever a filter changes
    useEffect(() => {
        if (!ready || !data) return
        const L = leafletRef.current
        const layer = layerRef.current
        layer.clearLayers()

        data.points
            .filter(p => province === "All" || p.province === province)
            .filter(p => (p.grouped ? showGrouped : showFacilities))
            .forEach(p => {
                const colour = PROVINCE_COLOURS[p.province] || '#2e9e6f'
                const width = p.grouped ? 28 : (p.count >= 20 ? 42 : 36)
                const height = Math.round(width * 1.28)

                const marker = L.marker([p.lat, p.lng], {
                    icon: L.divIcon({
                        className: 'member-pin',
                        html: pinSvg(colour, width, p.count),
                        iconSize: [width, height],
                        iconAnchor: [width / 2, height],
                        popupAnchor: [0, -height + 6]
                    }),
                    title: p.name,
                    zIndexOffset: 1000 - Math.min(p.count, 999) // small pins stay on top
                })
                marker.bindPopup(
                    `<strong>${esc(p.name)}</strong><br/>` +
                    `${esc(p.district)}, ${esc(p.province)}<br/>` +
                    `${p.count} member${p.count === 1 ? '' : 's'}` +
                    (p.grouped ? ` across ${p.facilities} facilities` : '')
                )
                marker.addTo(layer)
            })
    }, [ready, data, province, showFacilities, showGrouped])

    // 5. Zoom when the province changes
    useEffect(() => {
        if (!ready || !data) return
        const map = mapRef.current
        const coords = data.points
            .filter(p => province === "All" || p.province === province)
            .map(p => [p.lat, p.lng])
        if (province === "All" || coords.length === 0) {
            map.fitBounds(SA_BOUNDS)
        } else {
            map.fitBounds(coords, { padding: [50, 50], maxZoom: 8 })
        }
    }, [ready, data, province])

    // 6. Clean up on unmount
    useEffect(() => () => {
        if (mapRef.current) { mapRef.current.remove(); mapRef.current = null }
    }, [])

    return (
        <MemberMapView
            data={data} error={error}
            province={province} setProvince={setProvince}
            showFacilities={showFacilities} setShowFacilities={setShowFacilities}
            showGrouped={showGrouped} setShowGrouped={setShowGrouped}
            satellite={satellite} setSatellite={setSatellite}
            mapEl={mapEl}
        />
    )
}

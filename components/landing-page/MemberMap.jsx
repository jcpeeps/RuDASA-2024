import React, { useEffect, useRef, useState } from 'react'
import 'leaflet/dist/leaflet.css'

const PROVINCE_COLOURS = {
    "Eastern Cape":  "#2f7de1",
    "Free State":    "#43a047",
    "Gauteng":       "#e6b800",
    "KwaZulu-Natal": "#e8508a",
    "Limpopo":       "#8bc34a",
    "Mpumalanga":    "#212121",
    "Northern Cape": "#7e3ff2",
    "North West":    "#d2691e",
    "Western Cape":  "#f59e0b"
}
const SA_BOUNDS = [[-35.0, 16.3], [-22.0, 33.0]]
const PIN_PATH = "M18 45C18 45 3 28 3 17a15 15 0 0 1 30 0c0 11-15 28-15 28z"

function esc(s) {
    return String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]))
}

// Teardrop pin with the member count inside
function pinSvg(colour, width, label) {
    const height = Math.round(width * 1.28)
    const fontSize = String(label).length >= 3 ? 9 : 12
    return (
        `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 36 46" ` +
        `style="filter:drop-shadow(0 2px 2px rgba(0,0,0,.35));overflow:visible">` +
        `<path d="${PIN_PATH}" fill="${colour}" stroke="#fff" stroke-width="2"/>` +
        `<circle cx="18" cy="17" r="10.5" fill="#fff"/>` +
        `<text x="18" y="${17 + fontSize * 0.36}" text-anchor="middle" font-size="${fontSize}" font-weight="700" ` +
        `fill="#222" font-family="Arial, sans-serif">${label}</text>` +
        `</svg>`
    )
}

function KeyPin({ colour }) {
    return (
        <svg width="16" height="20" viewBox="0 0 36 46" style={{ flex: "none" }} aria-hidden="true">
            <path d={PIN_PATH} fill={colour} stroke="#fff" strokeWidth="2" />
            <circle cx="18" cy="17" r="8" fill="#fff" />
        </svg>
    )
}

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

    // Province totals for the dropdown and the key
    const provinceTotals = {}
    if (data) {
        data.points.forEach(p => {
            provinceTotals[p.province] = (provinceTotals[p.province] || 0) + p.count
        })
    }
    const provinceList = Object.keys(provinceTotals).sort((a, b) => provinceTotals[b] - provinceTotals[a])

    const keyRows = (
        <>
            {provinceList.map(name => (
                <button
                    key={name}
                    type="button"
                    onClick={() => setProvince(province === name ? "All" : name)}
                    className="btn btn-link p-0 d-flex align-items-center text-start text-decoration-none text-dark"
                    style={{ gap: 8, fontWeight: province === name ? 700 : 400 }}
                >
                    <KeyPin colour={PROVINCE_COLOURS[name] || "#2e9e6f"} />
                    <span>{name} ({provinceTotals[name]})</span>
                </button>
            ))}
        </>
    )

    return (
        <section className="px-3" id="member-map">
            <div className="container py-2 py-lg-5">
                <div className="my-5 py-2 py-lg-5">
                    <h1 className="display-4 fw-bold mb-4 text-center">Where our members work</h1>
                    <p className="text-center mx-auto mb-4" style={{ maxWidth: 700 }}>
                        RuDASA members work in rural facilities across South Africa.
                        Choose a province to zoom in, or tap a pin to see the details.
                    </p>

                    {error && (
                        <p className="text-center text-muted my-5">
                            The member map is temporarily unavailable. Please try again later.
                        </p>
                    )}

                    {!data && !error && (
                        <p className="text-center text-muted my-5">Loading map...</p>
                    )}

                    {data && (
                        <>
                            <div className="text-center mb-4">
                                <span className="display-5 fw-bold text-primary">{data.total.toLocaleString()}</span>
                                <div className="text-muted">RuDASA members</div>
                            </div>

                            {/* Controls */}
                            <div className="d-flex flex-wrap align-items-center gap-3 mb-3">
                                <select
                                    className="form-select w-auto"
                                    aria-label="Filter by province"
                                    value={province}
                                    onChange={(e) => setProvince(e.target.value)}
                                >
                                    <option value="All">All provinces</option>
                                    {provinceList.map(name => (
                                        <option key={name} value={name}>{name} ({provinceTotals[name]})</option>
                                    ))}
                                </select>
                                <button
                                    type="button"
                                    className="btn btn-outline-secondary bg-white text-dark fw-semibold"
                                    onClick={() => setSatellite(s => !s)}
                                >
                                    {satellite ? "Street view" : "Satellite view"}
                                </button>
                            </div>

                            <div className="d-flex flex-wrap gap-4 mb-3">
                                <div className="form-check">
                                    <input
                                        id="mm-facilities" type="checkbox" className="form-check-input"
                                        checked={showFacilities} onChange={(e) => setShowFacilities(e.target.checked)}
                                    />
                                    <label htmlFor="mm-facilities" className="form-check-label">Facilities with 5+ members</label>
                                </div>
                                <div className="form-check">
                                    <input
                                        id="mm-grouped" type="checkbox" className="form-check-input"
                                        checked={showGrouped} onChange={(e) => setShowGrouped(e.target.checked)}
                                    />
                                    <label htmlFor="mm-grouped" className="form-check-label">Smaller facilities (grouped by district)</label>
                                </div>
                            </div>

                            {/* Map with key overlay */}
                            <div style={{ position: "relative" }}>
                                <div
                                    ref={mapEl}
                                    style={{
                                        width: "100%",
                                        height: "clamp(420px, 65vh, 620px)",
                                        borderRadius: 12,
                                        overflow: "hidden",
                                        boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
                                        zIndex: 0
                                    }}
                                />
                                <div
                                    className="d-none d-md-block"
                                    style={{
                                        position: "absolute", top: 12, right: 12, zIndex: 1000,
                                        background: "#fff", borderRadius: 12, padding: "14px 18px",
                                        boxShadow: "0 2px 12px rgba(0,0,0,0.18)", fontSize: "0.9rem",
                                        maxHeight: "calc(100% - 24px)", overflowY: "auto"
                                    }}
                                >
                                    <div className="fw-bold text-muted mb-2" style={{ letterSpacing: 1, fontSize: "0.75rem" }}>KEY</div>
                                    <div className="d-flex flex-column" style={{ gap: 8 }}>{keyRows}</div>
                                    <div className="text-muted mt-3" style={{ fontSize: "0.75rem", maxWidth: 190 }}>
                                        The number on each pin is the member count. Smaller pins group facilities with fewer than 5 members.
                                    </div>
                                </div>
                            </div>

                            {/* Key for phones, below the map */}
                            <div className="d-md-none mt-3">
                                <div className="fw-bold text-muted mb-2" style={{ letterSpacing: 1, fontSize: "0.75rem" }}>KEY</div>
                                <div className="d-flex flex-wrap" style={{ gap: "8px 16px", fontSize: "0.9rem" }}>{keyRows}</div>
                                <div className="text-muted mt-2" style={{ fontSize: "0.75rem" }}>
                                    The number on each pin is the member count. Smaller pins group facilities with fewer than 5 members.
                                </div>
                            </div>

                            <p className="text-center text-muted small mt-3 mb-0">
                                Facilities with fewer than 5 members are grouped by district to protect member privacy.
                            </p>
                        </>
                    )}
                </div>
            </div>
        </section>
    )
}

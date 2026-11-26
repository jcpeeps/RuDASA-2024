import React from 'react'

export const PROVINCE_COLOURS = {
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

export const SA_BOUNDS = [[-35.0, 16.3], [-22.0, 33.0]]

const PIN_PATH = "M18 45C18 45 3 28 3 17a15 15 0 0 1 30 0c0 11-15 28-15 28z"

export function esc(s) {
    return String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]))
}

// The feed never sends exact numbers below 5. It sends null, which we show as "<5".
export function fmt(n) {
    return n === null || n === undefined ? "<5" : n.toLocaleString()
}

// Teardrop pin with the member count (or "<5") inside
export function pinSvg(colour, width, count) {
    const height = Math.round(width * 1.28)
    const text = count === null ? "&lt;5" : String(count)
    const fontSize = text.length >= 3 ? 9 : 12
    return (
        `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 36 46" ` +
        `style="filter:drop-shadow(0 2px 2px rgba(0,0,0,.35));overflow:visible">` +
        `<path d="${PIN_PATH}" fill="${colour}" stroke="#fff" stroke-width="2"/>` +
        `<circle cx="18" cy="17" r="10.5" fill="#fff"/>` +
        `<text x="18" y="${17 + fontSize * 0.36}" text-anchor="middle" font-size="${fontSize}" font-weight="700" ` +
        `fill="#222" font-family="Arial, sans-serif">${text}</text>` +
        `</svg>`
    )
}

// Small pin used in the key
export function KeyPin({ colour }) {
    return (
        <svg width="16" height="20" viewBox="0 0 36 46" style={{ flex: "none" }} aria-hidden="true">
            <path d={PIN_PATH} fill={colour} stroke="#fff" strokeWidth="2" />
            <circle cx="18" cy="17" r="8" fill="#fff" />
        </svg>
    )
}

// One map pin for one facility
export function makeMarker(L, p) {
    const small = p.count === null
    const width = small ? 26 : (p.count >= 20 ? 42 : 36)
    const height = Math.round(width * 1.28)
    const marker = L.marker([p.lat, p.lng], {
        icon: L.divIcon({
            className: 'member-pin',
            html: pinSvg(PROVINCE_COLOURS[p.province] || '#2e9e6f', width, p.count),
            iconSize: [width, height], iconAnchor: [width / 2, height], popupAnchor: [0, -height + 6]
        }),
        title: p.name,
        zIndexOffset: small ? 1000 : 1000 - Math.min(p.count, 999) // small pins stay on top
    })
    marker.bindPopup(
        `<strong>${esc(p.name)}</strong><br/>${esc(p.district)}, ${esc(p.province)}<br/>` +
        (small ? "Fewer than 5 members" : `${p.count} member${p.count === 1 ? '' : 's'}`)
    )
    return marker
}

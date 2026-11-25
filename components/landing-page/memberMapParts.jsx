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

// Full Looker Studio report (opens in a new tab)
export const FULL_REPORT_URL = "https://lookerstudio.google.com/reporting/03a387dc-5b5b-4bf7-ada7-9d952d863615/page/xe1yF"

export const SA_BOUNDS = [[-35.0, 16.3], [-22.0, 33.0]]

const PIN_PATH = "M18 45C18 45 3 28 3 17a15 15 0 0 1 30 0c0 11-15 28-15 28z"

export function esc(s) {
    return String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]))
}

// Teardrop pin with the member count inside
export function pinSvg(colour, width, label) {
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

// Small pin used in the key
export function KeyPin({ colour }) {
    return (
        <svg width="16" height="20" viewBox="0 0 36 46" style={{ flex: "none" }} aria-hidden="true">
            <path d={PIN_PATH} fill={colour} stroke="#fff" strokeWidth="2" />
            <circle cx="18" cy="17" r="8" fill="#fff" />
        </svg>
    )
}

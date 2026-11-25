import React from 'react'
import { PROVINCE_COLOURS, KeyPin } from './memberMapParts'

const NOTE = "The number on each pin is the member count. Smaller pins group facilities with fewer than 5 members."

// The KEY. On desktop it floats over the map, on phones it sits under the map (phone = true).
export default function MemberMapKey({ provinceList, provinceTotals, province, setProvince, phone }) {
    const rows = provinceList.map(name => (
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
    ))

    if (phone) {
        return (
            <div className="d-md-none mt-3">
                <div className="fw-bold text-muted mb-2" style={{ letterSpacing: 1, fontSize: "0.75rem" }}>KEY</div>
                <div className="d-flex flex-wrap" style={{ gap: "8px 16px", fontSize: "0.9rem" }}>{rows}</div>
                <div className="text-muted mt-2" style={{ fontSize: "0.75rem" }}>{NOTE}</div>
            </div>
        )
    }

    return (
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
            <div className="d-flex flex-column" style={{ gap: 8 }}>{rows}</div>
            <div className="text-muted mt-3" style={{ fontSize: "0.75rem", maxWidth: 190 }}>{NOTE}</div>
        </div>
    )
}

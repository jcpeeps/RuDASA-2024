import React from 'react'
import { FULL_REPORT_URL } from './memberMapParts'
import MemberMapKey from './MemberMapKey'

// Everything the visitor sees. The map logic lives in MemberMap.jsx.
export default function MemberMapView({
    data, error, province, setProvince,
    showFacilities, setShowFacilities,
    showGrouped, setShowGrouped,
    satellite, setSatellite, mapEl
}) {
    // Province totals for the dropdown and the key
    const provinceTotals = {}
    if (data) {
        data.points.forEach(p => {
            provinceTotals[p.province] = (provinceTotals[p.province] || 0) + p.count
        })
    }
    const provinceList = Object.keys(provinceTotals).sort((a, b) => provinceTotals[b] - provinceTotals[a])
    const keyProps = { provinceList, provinceTotals, province, setProvince }

    return (
        <section className="px-3" id="member-map" style={{ overflow: "hidden", maxWidth: "100%" }}>
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
                                    style={{ maxWidth: "100%" }}
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

                            {/* Map with the key floating over it on desktop */}
                            <div style={{ position: "relative", maxWidth: "100%", overflow: "hidden", borderRadius: 12, isolation: "isolate", contain: "paint" }}>
                                <div
                                    ref={mapEl}
                                    style={{
                                        width: "100%",
                                        height: "clamp(420px, 65vh, 620px)",
                                        borderRadius: 12,
                                        overflow: "hidden",
                                        maxWidth: "100%",
                                        boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
                                        isolation: "isolate",
                                        zIndex: 0
                                    }}
                                />
                                <MemberMapKey {...keyProps} />
                            </div>

                            {/* Key for phones, below the map */}
                            <MemberMapKey {...keyProps} phone />

                            <p className="text-center text-muted small mt-3 mb-0">
                                Facilities with fewer than 5 members are grouped by district to protect member privacy.
                            </p>
                        </>
                    )}

                    {/* Link to the full Looker Studio report */}
                    <div className="d-flex justify-content-center mt-4">
                        <div className="hover-button">
                            <a
                                href={FULL_REPORT_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                role="button"
                                className="btn btn-lg btn-primary gradient-background text-white"
                            >
                                View the full interactive report
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

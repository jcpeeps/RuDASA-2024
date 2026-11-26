import React from 'react'
import { fmt } from './memberMapParts'
import MemberMapKey from './MemberMapKey'
import MemberMapControls from './MemberMapControls'

// Everything the visitor sees. The map logic lives in MemberMap.jsx.
export default function MemberMapView({ data, error, scope, mapEl, controls }) {
    const keyProps = data && {
        provinces: scope.provinces, grandTotal: data.total,
        province: controls.province, setProvince: controls.onProvince
    }

    return (
        <section className="px-3" id="member-map" style={{ overflow: "hidden", maxWidth: "100%" }}>
            <div className="container py-2 py-lg-5">
                <div className="my-5 py-2 py-lg-5">
                    <h1 className="display-4 fw-bold mb-4 text-center">Where our members work</h1>
                    <p className="text-center mx-auto mb-4" style={{ maxWidth: 700 }}>
                        Every facility where a RuDASA member works has a pin. Choose a province or district,
                        search for a facility, or tap a pin to see the details.
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
                                <span className="display-5 fw-bold text-primary">{fmt(scope.total)}</span>
                                <div className="text-muted">{scope.label}</div>
                            </div>

                            <MemberMapControls {...controls} provinces={scope.provinces} districts={scope.districts} />

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
                                Where a facility or district has fewer than 5 members, the exact number is not shown,
                                to protect member privacy.
                            </p>
                        </>
                    )}
                </div>
            </div>
        </section>
    )
}

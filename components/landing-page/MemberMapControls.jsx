import React from 'react'

const BTN = { border: "1px solid #ced4da" }

// Filters, search, satellite and reset buttons
export default function MemberMapControls({
    province, onProvince, district, onDistrict, provinces, districts,
    search, onSearch, facilityLabels,
    satellite, onSatellite, showBig, onShowBig, showSmall, onShowSmall, onReset
}) {
    return (
        <>
            <div className="d-flex flex-wrap align-items-center gap-3 mb-3">
                <select
                    className="form-select w-auto" style={{ maxWidth: "100%" }}
                    aria-label="Filter by province"
                    value={province} onChange={(e) => onProvince(e.target.value)}
                >
                    <option value="All">All provinces</option>
                    {provinces.map(p => <option key={p.name} value={p.name}>{p.name}</option>)}
                </select>

                <select
                    className="form-select w-auto" style={{ maxWidth: "100%" }}
                    aria-label="Filter by district"
                    value={district} disabled={province === "All"}
                    onChange={(e) => onDistrict(e.target.value)}
                >
                    <option value="All">{province === "All" ? "Choose a province first" : "All districts"}</option>
                    {districts.map(d => <option key={d.district} value={d.district}>{d.district}</option>)}
                </select>

                <input
                    type="search" className="form-control w-auto"
                    style={{ minWidth: 230, maxWidth: "100%" }}
                    placeholder="Search for a facility"
                    aria-label="Search for a facility"
                    list="mm-facility-list"
                    value={search} onChange={(e) => onSearch(e.target.value)}
                />
                <datalist id="mm-facility-list">
                    {facilityLabels.map(l => <option key={l} value={l} />)}
                </datalist>
            </div>

            <div className="d-flex flex-wrap align-items-center gap-3 mb-3">
                <button type="button" className="btn bg-white text-dark fw-semibold" style={BTN}
                    onClick={() => onSatellite(s => !s)}>
                    {satellite ? "Street view" : "Satellite view"}
                </button>
                <button type="button" className="btn bg-white text-dark fw-semibold" style={BTN} onClick={onReset}>
                    Reset
                </button>
            </div>

            <div className="d-flex flex-wrap gap-4 mb-3">
                <div className="form-check">
                    <input id="mm-big" type="checkbox" className="form-check-input"
                        checked={showBig} onChange={(e) => onShowBig(e.target.checked)} />
                    <label htmlFor="mm-big" className="form-check-label">Facilities with 5+ members</label>
                </div>
                <div className="form-check">
                    <input id="mm-small" type="checkbox" className="form-check-input"
                        checked={showSmall} onChange={(e) => onShowSmall(e.target.checked)} />
                    <label htmlFor="mm-small" className="form-check-label">Facilities with fewer than 5 members</label>
                </div>
            </div>
        </>
    )
}

// Works out the numbers shown on the page for the current selection.
// A total of null means "fewer than 5" (the feed never sends exact small numbers).

// Unique text for a facility, used by the search box
export function facilityLabel(p) {
    return p.name + ", " + p.district
}

export function deriveScope(data, province, district) {
    const provinces = Object.keys(data.provinces)
        .map(name => ({ name, total: data.provinces[name] }))
        .sort((a, b) => (b.total || 0) - (a.total || 0))

    const districts = data.districts
        .filter(d => d.province === province && d.district && d.district !== "Unknown")
        .sort((a, b) => a.district.localeCompare(b.district))

    let label = "RuDASA members"
    let total = data.total

    if (province !== "All") {
        label = "members in " + province
        total = data.provinces[province] === undefined ? null : data.provinces[province]
    }
    if (province !== "All" && district !== "All") {
        const d = data.districts.find(x => x.province === province && x.district === district)
        label = "members in " + district
        total = d ? d.total : null
    }
    return { provinces, districts, label, total }
}

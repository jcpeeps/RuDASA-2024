import React from 'react'

export default function Address() {
    return (
        <div>
            <div className="my-5 w-100 d-flex justify-content-between">
                <div className="w-50 me-5">
                    <label for="country" className="text-primary fw-bold form-label">Country*</label>
                    <select id="country" class="form-select border-0 border-bottom" aria-label="country">
                        <option value="rural-work">Rural work</option>
                        <option value="information">RHC information</option>
                        <option value="onboarding">Onboarding programme</option>
                        <option value="rhc">Rural Health Club</option>
                        <option value="event">Events</option>
                    </select>
                </div>
                <div className="w-50">
                    <label for="province" className="text-primary fw-bold form-label">Province*</label>
                    <select id="province" class="form-select border-0 border-bottom" aria-label="province">
                        <option value="rural-work">Rural work</option>
                        <option value="information">RHC information</option>
                        <option value="onboarding">Onboarding programme</option>
                        <option value="rhc">Rural Health Club</option>
                        <option value="event">Events</option>
                    </select>
                </div>
            </div>
            <div className="mb-5 w-100 d-flex justify-content-between">
                <div className="w-50 me-5">
                    <label for="address-1" className="text-primary fw-bold form-label ms-2">Address*</label>
                    <input id="address-1" className="form-control border-0 border-bottom" type="text" placeholder="Line 1" />
                    <input className="form-control border-0 border-bottom my-2" type="text" placeholder="Line 2" />
                    <input className="form-control border-0 border-bottom" type="text" placeholder="Line 3" />
                </div>
                <div className="w-50">
                    <div className="mb-4">
                        <label for="pow" className="text-primary fw-bold form-label ms-2">Place of work*</label>
                        <input id="pow" className="form-control border-0 border-bottom" type="text" placeholder="Work name" />
                    </div>
                    <div>
                        <label for="district" className="text-primary fw-bold form-label ms-2">District</label>
                        <input id="district" className="form-control border-0 border-bottom" type="tel" placeholder="District name" />
                    </div>
                </div>
            </div>
        </div>
    )
}

import React from 'react'

export default function Club() {
    return (
        <div>
            <div className="my-5 w-100 d-flex justify-content-between">
                <div className="w-50 me-5">
                    <label for="sc-name" className="text-primary fw-bold form-label ms-2">Student Club*</label>
                    <input id="sc-name" className="form-control border-0 border-bottom" type="text" placeholder="Student club name" />
                    <input className="form-control border-0 border-bottom my-2" type="text" placeholder="University name" />
                </div>
                <div className="w-50">
                    <div className="mb-4">
                        <label className="text-primary fw-bold form-label ms-2">Does Your Club Recieve External Support?</label>
                        <div className="d-flex ms-3">
                            <div className="form-check me-4">
                                <input id="support-yes" className="form-check-input" type="radio" />
                                <label id="support-yes" className="form-check-label ms-2">Yes</label>
                            </div>
                            <div className="form-check">
                                <input id="support-no" className="form-check-input" type="radio" />
                                <label id="support-no" className="form-check-label ms-2 checked">No</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mb-5 w-100 d-flex justify-content-between">
                <div className="w-50 me-5">
                    <label for="contact-person" className="text-primary fw-bold form-label ms-2">Contact Person*</label>
                    <input id="contact-person" className="form-control border-0 border-bottom" type="text" placeholder="Name" />
                    <input className="form-control border-0 border-bottom my-2" type="text" placeholder="Role" />
                    <input className="form-control border-0 border-bottom my-2" type="tel" placeholder="Cellphone number" />
                    <input className="form-control border-0 border-bottom my-2" type="text" placeholder="Email" />
                </div>
                <div className="w-50">
                    <label for="support-person" className="text-primary fw-bold form-label ms-2">Person Giving Support*</label>
                    <input id="support-person" className="form-control border-0 border-bottom" type="text" placeholder="Name" />
                </div>
            </div>
        </div>
    )
}

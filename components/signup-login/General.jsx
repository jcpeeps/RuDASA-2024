import React from 'react'

export default function General() {
    return (
        <div>
            <div className="my-5 w-100 d-flex justify-content-between">
                <div className="w-50 me-5">
                    <label for="fullName" className="text-primary fw-bold form-label ms-2">Full Name*</label>
                    <input id="fullName" className="form-control border-0 border-bottom" type="text" placeholder="Name" />
                </div>
                <div className="w-50">
                    <label for="email" className="text-primary fw-bold form-label ms-2">Email Address*</label>
                    <input id="email" className="form-control border-0 border-bottom" type="email" placeholder="Email" />
                </div>
            </div>
            <div className="mb-5 w-100 d-flex justify-content-between">
                <div className="w-50 me-5">
                    <label for="password" className="text-primary fw-bold form-label ms-2">Password*</label>
                    <input id="password" className="form-control border-0 border-bottom" type="password" placeholder="Password" />
                </div>
                <div className="w-50">
                    <label for="reason" className="text-primary fw-bold form-label ms-2">Reason for sign up*</label>
                    <select id="reason" class="form-select border-0 border-bottom" aria-label="reason">
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
                    <label for="cell" className="text-primary fw-bold form-label ms-2">Cellphone number*</label>
                    <input id="cell" className="form-control border-0 border-bottom" type="tel" placeholder="Number" />
                </div>
                <div className="w-50">
                    <label for="work" className="text-primary fw-bold form-label ms-2">Work Telephone</label>
                    <input id="work" className="form-control border-0 border-bottom" type="tel" placeholder="Number" />
                </div>
            </div>
        </div>
    )
}

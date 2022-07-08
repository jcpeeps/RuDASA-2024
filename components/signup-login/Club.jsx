import React from 'react'

export default function Club({formData, setFormData}) {
    return (
        <div>
            <div className="my-5 w-100 d-flex justify-content-between">
                <div className="w-50 me-5">
                    <label for="sc-name" className="text-primary fw-bold form-label ms-2">Student Club*</label>
                    <input id="sc-name" className="form-control border-0 border-bottom" type="text" placeholder="Student club name"
                        value={formData.clubName}
                        onChange={(e) => setFormData({...formData, clubName: e.target.value})} />
                    <input className="form-control border-0 border-bottom my-2" type="text" placeholder="University name"
                        value={formData.uniName}
                        onChange={(e) => setFormData({...formData, uniName: e.target.value})} />
                </div>
                <div className="w-50">
                    <div className="mb-4">
                        <label className="text-primary fw-bold form-label ms-2">Does Your Club Recieve External Support?</label>
                        <div className="d-flex ms-3">
                            <div className="form-check me-4">
                                <input id="support-yes" className="form-check-input" type="radio" onChange={() => setFormData({...formData, externalSupport: "true"})} />
                                <label id="support-yes" className="form-check-label ms-2">Yes</label>
                            </div>
                            <div className="form-check">
                                <input id="support-no" className="form-check-input" type="radio" onChange={() => setFormData({...formData, externalSupport: "false"})} />
                                <label id="support-no" className="form-check-label ms-2 checked">No</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mb-5 w-100 d-flex justify-content-between">
                <div className="w-50 me-5">
                    <label for="contact-person" className="text-primary fw-bold form-label ms-2">Contact Person*</label>
                    <input id="contact-person" className="form-control border-0 border-bottom" type="text" placeholder="Name"
                        value={formData.contactName}
                        onChange={(e) => setFormData({...formData, contactName: e.target.value})} />
                    <input className="form-control border-0 border-bottom my-2" type="text" placeholder="Role"
                        value={formData.contactRole}
                        onChange={(e) => setFormData({...formData, contactRole: e.target.value})} />
                    <input className="form-control border-0 border-bottom my-2" type="tel" placeholder="Cellphone number"
                        value={formData.contactEmail}
                        onChange={(e) => setFormData({...formData, contactEmail: e.target.value})} />
                    <input className="form-control border-0 border-bottom my-2" type="text" placeholder="Email" />
                </div>
                <div className="w-50">
                    <label for="support-person" className="text-primary fw-bold form-label ms-2">Person Giving Support*</label>
                    <input id="support-person" className="form-control border-0 border-bottom" type="text" placeholder="Name"
                        value={formData.supportName}
                        onChange={(e) => setFormData({...formData, supportName: e.target.value})} />
                </div>
            </div>
        </div>
    )
}

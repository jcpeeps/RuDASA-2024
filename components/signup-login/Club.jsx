import React from 'react'
import { Field, ErrorMessage } from "formik";

export default function Club({ formData, setFormData }) {
    return (
        <>
            <div className="my-4 my-lg-5 w-100 d-flex flex-column flex-sm-row justify-content-center justify-content-md-between">
                <div className="w-auto me-sm-5 mb-4 mb-sm-0 form-group">
                    <label htmlFor="clubName" className="text-primary fw-bold form-label ms-2">Student Club*</label>
                    <Field
                        type="text"
                        name="clubName"
                        placeholder="Student club name"
                        className={`form-control border-0 border-bottom ${touched.clubName && errors.clubName ? "is-invalid" : ""
                            }`}
                        value={formData.clubName}
                        onChange={(e) => {
                            setFormData({ ...formData, clubName: e.target.value });
                            handleChange(e);
                        }}
                    />
                    <ErrorMessage
                        component="div"
                        name="clubName"
                        className="invalid-feedback"
                    />
                    <Field
                        type="text"
                        name="uniName"
                        placeholder="University name"
                        className={`form-control border-0 border-bottom ${touched.uniName && errors.uniName ? "is-invalid" : ""
                            }`}
                        value={formData.uniName}
                        onChange={(e) => {
                            setFormData({ ...formData, uniName: e.target.value });
                            handleChange(e);
                        }}
                    />
                    <ErrorMessage
                        component="div"
                        name="uniName"
                        className="invalid-feedback"
                    />
                </div>
                <div className="w-auto form-group">
                    <div className="mb-4 form-group">
                        <label className="text-primary fw-bold form-label ms-2">Does Your Club Recieve External Support?</label>
                        <div className="d-flex ms-3">
                            <div className="form-check me-4">
                                <input id="support-yes" className="form-check-input" type="radio" onChange={() => setFormData({ ...formData, externalSupport: "true" })} />
                                <label id="support-yes" className="form-check-label ms-2">Yes</label>
                            </div>
                            <div className="form-check">
                                <input id="support-no" className="form-check-input" type="radio" onChange={() => setFormData({ ...formData, externalSupport: "false" })} />
                                <label id="support-no" className="form-check-label ms-2 checked">No</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="my-4 my-lg-5 w-100 d-flex flex-column flex-sm-row justify-content-center justify-content-md-between">
                <div className="w-auto me-sm-5 mb-4 mb-sm-0 form-group">
                    <label htmlFor="contactName" className="text-primary fw-bold form-label ms-2">Contact Person*</label>
                    <Field
                        type="text"
                        name="contactName"
                        placeholder="Name"
                        className={`form-control border-0 border-bottom ${touched.contactName && errors.contactName ? "is-invalid" : ""
                            }`}
                        value={formData.contactName}
                        onChange={(e) => {
                            setFormData({ ...formData, contactName: e.target.value });
                            handleChange(e);
                        }}
                    />
                    <ErrorMessage
                        component="div"
                        name="contactName"
                        className="invalid-feedback"
                    />
                    <Field
                        type="text"
                        name="contactRole"
                        placeholder="Role"
                        className={`form-control border-0 border-bottom ${touched.contactRole && errors.contactRole ? "is-invalid" : ""
                            }`}
                        value={formData.contactRole}
                        onChange={(e) => {
                            setFormData({ ...formData, contactRole: e.target.value });
                            handleChange(e);
                        }}
                    />
                    <ErrorMessage
                        component="div"
                        name="contactRole"
                        className="invalid-feedback"
                    />
                    <Field
                        type="tel"
                        name="contactNo"
                        placeholder="Cellphone number"
                        className={`form-control border-0 border-bottom ${touched.contactNo && errors.contactNo ? "is-invalid" : ""
                            }`}
                        value={formData.contactNo}
                        onChange={(e) => {
                            setFormData({ ...formData, contactNo: e.target.value });
                            handleChange(e);
                        }}
                    />
                    <ErrorMessage
                        component="div"
                        name="contactNo"
                        className="invalid-feedback"
                    />
                    <Field
                        type="text"
                        name="contactEmail"
                        placeholder="Email"
                        className={`form-control border-0 border-bottom ${touched.contactEmail && errors.contactEmail ? "is-invalid" : ""
                            }`}
                        value={formData.contactEmail}
                        onChange={(e) => {
                            setFormData({ ...formData, contactEmail: e.target.value });
                            handleChange(e);
                        }}
                    />
                    <ErrorMessage
                        component="div"
                        name="contactEmail"
                        className="invalid-feedback"
                    />
                </div>
                <div className="w-auto form-group">
                    <label htmlFor="supportName" className="text-primary fw-bold form-label ms-2">Person Giving Support*</label>
                    <Field
                        type="text"
                        name="supportName"
                        placeholder="Name"
                        className={`form-control border-0 border-bottom ${touched.supportName && errors.supportName ? "is-invalid" : ""
                            }`}
                        value={formData.supportName}
                        onChange={(e) => {
                            setFormData({ ...formData, supportName: e.target.value });
                            handleChange(e);
                        }}
                    />
                    <ErrorMessage
                        component="div"
                        name="supportName"
                        className="invalid-feedback"
                    />
                </div>
            </div>
        </>
    )
}

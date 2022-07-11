import React from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function Address({ formData, setFormData }) {

    const AddressSchema = Yup.object().shape({
        address: Yup.string()
            .required("Please provide an address"),
        pow: Yup.string()
            .required("Place of work is required"),
        district: Yup.string()
            .required("District is required")
    });

    return (
        <Formik
            initialValues={{ address: "", pow: "", district: "" }}
            validationSchema={AddressSchema}
        >
            {({ touched, errors }) => (
                <Form>
                    <div className="my-5 w-100 d-flex justify-content-between">
                        <div className="w-50 me-5 form-group">
                            <label for="country" className="text-primary fw-bold form-label">Country*</label>
                            <select id="country" class="form-select border-0 border-bottom" aria-label="country" value={formData.country} onChange={(e) => setFormData({ ...formData, country: e.target.value })}>
                                <option value="rural-work">Rural work</option>
                                <option value="information">RHC information</option>
                                <option value="onboarding">Onboarding programme</option>
                                <option value="rhc">Rural Health Club</option>
                                <option value="event">Events</option>
                            </select>
                        </div>
                        <div className="w-50 form-group">
                            <label for="province" className="text-primary fw-bold form-label">Province*</label>
                            <select id="province" class="form-select border-0 border-bottom" aria-label="province" value={formData.province} onChange={(e) => setFormData({ ...formData, province: e.target.value })}>
                                <option value="rural-work">Rural work</option>
                                <option value="information">RHC information</option>
                                <option value="onboarding">Onboarding programme</option>
                                <option value="rhc">Rural Health Club</option>
                                <option value="event">Events</option>
                            </select>
                        </div>
                    </div>
                    <div className="mb-5 w-100 d-flex justify-content-between">
                        <div className="w-50 me-5 form-group">
                            <label htmlFor="address" className="text-primary fw-bold form-label ms-2">Address*</label>
                            <Field
                                type="text"
                                name="address"
                                placeholder="Line 1"
                                className={`form-control border-0 border-bottom ${touched.address && errors.address ? "is-invalid" : ""
                                    }`}
                                value={formData.address1}
                                onChange={(e) => setFormData({ ...formData, address1: e.target.value })} />
                            <ErrorMessage
                                component="div"
                                name="address"
                                className="invalid-feedback"
                            />
                            <Field className="form-control border-0 border-bottom my-2" type="text" placeholder="Line 2"
                                value={formData.address2}
                                onChange={(e) => setFormData({ ...formData, address2: e.target.value })} />
                            <Field className="form-control border-0 border-bottom" type="text" placeholder="Line 3"
                                value={formData.address3}
                                onChange={(e) => setFormData({ ...formData, address3: e.target.value })} />
                        </div>
                        <div className="w-50">
                            <div className="mb-4 form-group">
                                <label htmlFor="pow" className="text-primary fw-bold form-label ms-2">Place of work*</label>
                                <Field
                                    type="text"
                                    name="pow"
                                    placeholder="Work name"
                                    className={`form-control border-0 border-bottom ${touched.pow && errors.pow ? "is-invalid" : ""
                                        }`}
                                    value={formData.workPlace}
                                    onChange={(e) => setFormData({ ...formData, workPlace: e.target.value })}
                                />
                                <ErrorMessage
                                    component="div"
                                    name="pow"
                                    className="invalid-feedback"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="district" className="text-primary fw-bold form-label ms-2">District</label>
                                <Field
                                    type="text" 
                                    name="district"
                                    placeholder="District name" 
                                    className={`form-control border-0 border-bottom ${
                                        touched.district && errors.district ? "is-invalid" : ""
                                    }`} 
                                    value={formData.district}
                                    onChange={(e) => setFormData({ ...formData, district: e.target.value })} 
                                />
                                <ErrorMessage
                                    component="div"
                                    name="district"
                                    className="invalid-feedback"
                                />
                            </div>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    )
}

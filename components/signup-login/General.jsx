import React from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function General({ formData, setFormData }) {

    const GeneralSchema = Yup.object({
        fullName: Yup.string()
            .matches(
                /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
                'Name can only contain letters.'
            )
            .matches(/^\s*[\S]+(\s[\S]+)+\s*$/gms, 'Please enter your full name.')
            .required("Please enter your full name"),
        email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
        password: Yup.string()
            .required("Password is required")
            .min(5, "Password must be minimum 5 characters"),
        cellNo: Yup.string()
            .matches(
                /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
                'Invalid phone number'),
        workNo: Yup.string()
            .matches(
                /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
                'Invalid phone number')
    });

    return (
        <Formik
            initialValues={{ fullName: "", email: "", password: "", cellNo: "", workNo: "" }}
            validationSchema={GeneralSchema}
        >
            {({ touched, errors }) => (
                <Form className="px-3 px-md-0">
                    <div className="my-4 my-lg-5 w-100 d-flex flex-column flex-sm-row justify-content-center justify-content-md-between">
                        <div className="w-auto me-sm-5 mb-4 mb-sm-0 form-group">
                            <label htmlFor="fullName" className="text-primary fw-bold form-label ms-2">Full Name*</label>
                            <Field
                                type="text"
                                name="fullName"
                                placeholder="Name"
                                className={`form-control border-0 border-bottom ${
                                    touched.fullName && errors.fullName ? "is-invalid" : ""
                                }`}
                                value={formData.fullName}
                                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                            />
                            <ErrorMessage
                                component="div"
                                name="fullName"
                                className="invalid-feedback"
                            />
                        </div>
                        <div className="w-auto form-group">
                            <label htmlFor="email" className="text-primary fw-bold form-label ms-2">Email Address*</label>
                            <Field
                                type="email" 
                                name="email"
                                placeholder="Email" 
                                className={`form-control border-0 border-bottom ${
                                    touched.email && errors.email ? "is-invalid" : ""
                                }`} 
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
                            />
                            <ErrorMessage
                                component="div"
                                name="email"
                                className="invalid-feedback"
                            />
                        </div>
                    </div>
                    <div className="mb-5 w-100 d-flex flex-column flex-sm-row justify-content-center justify-content-md-between">
                        <div className="w-auto me-sm-5 mb-4 mb-sm-0 form-group">
                            <label htmlFor="password" className="text-primary fw-bold form-label ms-2">Password*</label>
                            <Field
                                type="password"
                                name="password"
                                placeholder="Password" 
                                className={`form-control border-0 border-bottom ${
                                    touched.password && errors.password ? "is-invalid" : ""
                                }`}  
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })} 
                            />
                            <ErrorMessage
                                component="div"
                                name="password"
                                className="invalid-feedback"
                            />
                        </div>
                        <div className="w-auto form-group">
                            <label htmlFor="reason" className="text-primary fw-bold form-label ms-2">Reason for sign up*</label>
                            <select id="reason" className="form-select border-0 border-bottom" aria-label="reason" value={formData.signUpReason} onChange={(e) => setFormData({ ...formData, signUpReason: e.target.value })}>
                                <option value="rural-work">Rural work</option>
                                <option value="information">RHC information</option>
                                <option value="onboarding">Onboarding programme</option>
                                <option value="rhc">Rural Health Club</option>
                                <option value="event">Events</option>
                            </select>
                        </div>
                    </div>
                    <div className="mb-5 w-100 d-flex flex-column flex-sm-row justify-content-center justify-content-md-between">
                        <div className="w-auto me-sm-5 mb-4 mb-sm-0 form-group">
                            <label htmlFor="cellNo" className="text-primary fw-bold form-label ms-2">Cellphone number*</label>
                            <Field
                                type="tel" 
                                name="cellNo"
                                placeholder="Number" 
                                className={`form-control border-0 border-bottom ${
                                    touched.cellNo && errors.cellNo ? "is-invalid" : ""
                                }`} 
                                value={formData.cellNo}
                                onChange={(e) => setFormData({ ...formData, cellNo: e.target.value })} 
                            />
                            <ErrorMessage
                                component="div"
                                name="cellNo"
                                className="invalid-feedback"
                            />
                        </div>
                        <div className="w-auto form-group">
                            <label htmlFor="workNo" className="text-primary fw-bold form-label ms-2">Work Telephone</label>
                            <Field
                                type="tel" 
                                name="workNo"
                                placeholder="Number" 
                                className={`form-control border-0 border-bottom ${
                                    touched.workNo && errors.workNo ? "is-invalid" : ""
                                }`}  
                                value={formData.workNo}
                                onChange={(e) => setFormData({ ...formData, workNo: e.target.value })} 
                            />
                            <ErrorMessage
                                component="div"
                                name="workNo"
                                className="invalid-feedback"
                            />
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    )
}

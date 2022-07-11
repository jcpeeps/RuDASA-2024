import React from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function General({ formData, setFormData }) {

    const GeneralSchema = Yup.object().shape({
        name: Yup.string()
            .matches(
                /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
                'Name can only contain letters.'
            )
            .matches(/^\s*[\S]+(\s[\S]+)+\s*$/gms, 'Please enter your full name.'),
        email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
        password: Yup.string()
            .min(5, "Password must be minimum 5 characters")
            .required("Password is required"),
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
            initialValues={{ name: "", email: "", password: "", cellNo: "", workNo: "" }}
            validationSchema={GeneralSchema}
            onSubmit={({ setSubmitting, values }) => {
                alert("Form is validated! Submitting the form...", values); //THIS IS WHERE YOU USE VALUES FOR BACKEND
                setSubmitting(false);
            }}
        >
            <div className="my-5 w-100 d-flex justify-content-between">
                <div className="w-50 me-5">
                    <label for="fullName" className="text-primary fw-bold form-label ms-2">Full Name*</label>
                    <input id="fullName" className="form-control border-0 border-bottom" type="text" placeholder="Name"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} />
                </div>
                <div className="w-50">
                    <label for="email" className="text-primary fw-bold form-label ms-2">Email Address*</label>
                    <input id="email" className="form-control border-0 border-bottom" type="email" placeholder="Email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                </div>
            </div>
            <div className="mb-5 w-100 d-flex justify-content-between">
                <div className="w-50 me-5">
                    <label for="password" className="text-primary fw-bold form-label ms-2">Password*</label>
                    <input id="password" className="form-control border-0 border-bottom" type="password" placeholder="Password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
                </div>
                <div className="w-50">
                    <label for="reason" className="text-primary fw-bold form-label ms-2">Reason for sign up*</label>
                    <select id="reason" class="form-select border-0 border-bottom" aria-label="reason" value={formData.signUpReason} onChange={(e) => setFormData({ ...formData, signUpReason: e.target.value })}>
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
                    <input id="cell" className="form-control border-0 border-bottom" type="tel" placeholder="Number"
                        value={formData.cellNo}
                        onChange={(e) => setFormData({ ...formData, cellNo: e.target.value })} />
                </div>
                <div className="w-50">
                    <label for="work" className="text-primary fw-bold form-label ms-2">Work Telephone</label>
                    <input id="work" className="form-control border-0 border-bottom" type="tel" placeholder="Number"
                        value={formData.workNo}
                        onChange={(e) => setFormData({ ...formData, workNo: e.target.value })} />
                </div>
            </div>
        </Formik>
    )
}

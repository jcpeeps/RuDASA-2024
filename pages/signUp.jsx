import React, { useState } from 'react'
import Layout from '../components/Layout'
import Image from 'next/image'
import Link from 'next/link'
import Illustration from '../media/svg/login.svg'
import ProgressBar from '../components/signup-login/ProgressBar'
import Benefits from '../components/signup-login/Benefits'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import useUser from './api/useUser'
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

//Get a list of all countries sorted by name
const { getData: getCountryData } = require('country-list');
const countries = getCountryData().sort((a, b) => a.name.localeCompare(b.name));

export default function SignUp({ data }) {
    const { mutateUser } = useUser({
        //Check if user is already logged in, if so redirect to profile page
        redirectTo: '/portal',
        redirectIfFound: true
    });

    const initVals = {
        fullName: "",
        email: "",
        password: "",
        signUpReason: "",
        cellNo: "",
        workNo: "",

        country: "ZA",
        province: "",
        address1: "",
        address2: "",
        address3: "",
        workPlace: "",
        district: "",

        clubName: "",
        uniName: "",
        externalSupport: "",
        contactName: "",
        contactRole: "",
        contactNo: "",
        contactEmail: "",
        supportName: ""
    };

    // Object that stores information across all components/stages of the form
    const [formData, setFormData] = useState({... initVals});

    //Get/update the main signup form error box for when something goes wrong while submitting
    const [formSubmitErr, setFormSubmitErr] = useState("");
    const [step, setStep] = useState(0);

    // Called when form submitted to pass data to the sheets.js API
    const handleSignup = async (vals) => {
        const payload = {
            type: "signup",
            data: vals
        }

        //TODO: Check data is valid before sending to sheets.js

        try {
            const response = await fetch('/api/sheets', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            }).then(resp => resp.json());

            if (response.status == "error" && ("code" in response)) {
                switch (response.code) {
                    case "emailTaken":
                    case "invalidSignup":
                        setFormSubmitErr(response.message); //Messages are set in sheets.js
                        break;

                    default:
                        setFormSubmitErr("Something went wrong while trying to sign up. Please try again later.");
                        break;
                }
            }
            else //Sign-up successful, login
            {
                const loginVals = {
                    email: vals.email,
                    password: vals.password
                }
                const response = await fetchJson('/api/login', {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(loginVals)
                });

                if (response.status == "failed" && ("code" in response)) {
                    setFormSubmitErr("Something went wrong while trying to log into your new account.\n" +
                        "Please login manually via the Learning Portal.");
                }

                mutateUser(response);
            }

            console.log(response);

        } catch (error) {
            console.error("FATAL ERROR\n" + error);
        }
    }

    let submitShow = false;
    if (step == 2 || (step == 1 && formData.signUpReason !== "rhc"))
        submitShow = true;

    //The validation schema that checks input is correct on the client side
    const Schema = Yup.object().shape({
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
                'Invalid phone number')
            .required("Cell no. is required"),
        workNo: Yup.string()
            .matches(
                /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
                'Invalid phone number'),
        clubName: Yup.string()
            .matches(
                /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
                'Club name can only contain letters.'
            )
            .required("Please enter your club name"),
        uniName: Yup.string()
            .matches(
                /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
                'University name can only contain letters.'
            )
            .required("University is required"),
        contactName: Yup.string()
            .matches(
                /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
                'Contact name can only contain letters.'
            )
            .required("Name is required"),
        contactRole: Yup.string()
            .matches(
                /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
                'Contact role can only contain letters.'
            )
            .required("Role is required"),
        contactNo: Yup.string()
            .matches(
                /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
                'Invalid phone number'),
        contactEmail: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
        supportName: Yup.string()
            .matches(
                /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
                'Name can only contain letters.'
            )
            .required("Name is required"),
        address: Yup.string()
            .required("Please provide an address"),
        pow: Yup.string()
            .required("Place of work is required"),
        district: Yup.string()
            .required("District is required")
    });

    return (
        <Layout pageTitle="RuDASA | Sign up" hide="true">
            <section>
                <div className="py-5 mb-5 container"></div>
                <div className="d-flex justify-content-center align-items-start mb-5 pb-5">
                    <Image src={Illustration} className="col-sm-12 col-md-12 col-lg-5 col-xl-5" width={600} height={600} alt="Illustration" />
                    <div className="col-sm-12 col-md-12 col-lg-5 col-xl-5 offset-md-1 offset-lg-1 d-flex flex-column align-items-center">
                        <h1 className="fw-bold w-100 mb-5 text-center text-primary">Sign Up</h1>
                        <ProgressBar step={step} thirdStep={formData.signUpReason === "rhc"} />
                        <div className="w-auto">
                            <Formik
                                initialValues={{... initVals}}
                                validationSchema={Schema}
                                onSubmit={(values) => {}}
                            >
                                {({ errors, touched, handleChange }) => (
                                    <Form className="px-3 px-md-0">
                                        {
                                        //========== FORM STEP 0 ===========//
                                        step == 0 ?
                                            <div>
                                                <div className="my-4 my-lg-5 w-100 d-flex flex-column flex-sm-row justify-content-center justify-content-md-between">
                                                    <div className="w-auto me-sm-5 mb-4 mb-sm-0 form-group">
                                                        <label htmlFor="fullName" className="text-primary fw-bold form-label ms-2">Full Name*</label>
                                                        <Field
                                                            type="text"
                                                            name="fullName"
                                                            placeholder="Name"
                                                            className={`form-control border-0 border-bottom ${touched.fullName && errors.fullName ? "is-invalid" : ""}`}
                                                            value={formData.fullName}
                                                            onChange={(e) => {
                                                                setFormData({ ...formData, fullName: e.target.value });
                                                                touched.fullName = false;
                                                                handleChange(e);
                                                            }}
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
                                                            className={`form-control border-0 border-bottom ${touched.email && errors.email ? "is-invalid" : ""}`}
                                                            value={formData.email}
                                                            onChange={(e) => {
                                                                setFormData({ ...formData, email: e.target.value });
                                                                setFormSubmitErr("");
                                                                handleChange(e);
                                                            }}
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
                                                            className={`form-control border-0 border-bottom ${touched.password && errors.password ? "is-invalid" : ""}`}
                                                            value={formData.password}
                                                            onChange={(e) => {
                                                                setFormData({ ...formData, password: e.target.value });
                                                                handleChange(e);
                                                            }}
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
                                                            className={`form-control border-0 border-bottom ${touched.cellNo && errors.cellNo ? "is-invalid" : ""}`}
                                                            value={formData.cellNo}
                                                            onChange={(e) => {
                                                                setFormData({ ...formData, cellNo: e.target.value });
                                                                handleChange(e);
                                                            }}
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
                                                            className={`form-control border-0 border-bottom ${touched.workNo && errors.workNo ? "is-invalid" : ""}`}
                                                            value={formData.workNo}
                                                            onChange={(e) => {
                                                                setFormData({ ...formData, workNo: e.target.value });
                                                                handleChange(e);
                                                            }}
                                                        />
                                                        <ErrorMessage
                                                            component="div"
                                                            name="workNo"
                                                            className="invalid-feedback"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            //========== FORM STEP 1 ===========//
                                            : step == 1 ?
                                                <div>
                                                    <div className="my-4 my-lg-5 w-100 d-flex flex-column flex-sm-row justify-content-center justify-content-md-between">
                                                        <div className="w-auto me-sm-5 mb-4 mb-sm-0 form-group">
                                                            <label htmlFor="country" className="text-primary fw-bold form-label">Country*</label>
                                                            <select id="country" className="form-select border-0 border-bottom" aria-label="country" value={formData.country} onChange={(e) => setFormData({ ...formData, country: e.target.value })}>
                                                                {
                                                                    countries.map(c => (
                                                                        <option key={c.code} value={c.code}>{c.name}</option>
                                                                    ))
                                                                }
                                                            </select>
                                                        </div>
                                                        <div className="w-auto form-group">
                                                            <label htmlFor="province" className="text-primary fw-bold form-label">Province*</label>
                                                            <select id="province" className="form-select border-0 border-bottom" aria-label="province" value={formData.province} onChange={(e) => setFormData({ ...formData, province: e.target.value })}>
                                                                {
                                                                    [
                                                                        ["EC",  "Eastern Cape"],
                                                                        ["FS",  "Free State"],
                                                                        ["GP",  "Gauteng"],
                                                                        ["KZN", "KwaZulu-Natal"],
                                                                        ["LP",  "Limpopo"],
                                                                        ["MP",  "Mpumalanga"],
                                                                        ["NC",  "Northern Cape"],
                                                                        ["NW",  "North West"],
                                                                        ["WC",  "Western Cape"]
                                                                    ].map(([code, name]) => (
                                                                        <option key={code} value={code}>{name}</option>
                                                                    ))
                                                                }
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="my-4 my-lg-5 w-100 d-flex flex-column flex-sm-row justify-content-center justify-content-md-between">
                                                        <div className="w-auto me-sm-5 mb-4 mb-sm-0 form-group">
                                                            <label htmlFor="address" className="text-primary fw-bold form-label ms-2">Address*</label>
                                                            <Field
                                                                type="text"
                                                                name="address"
                                                                placeholder="Line 1"
                                                                className={`form-control border-0 border-bottom ${touched.address && errors.address ? "is-invalid" : ""}`}
                                                                value={formData.address1}
                                                                onChange={(e) => {
                                                                    setFormData({ ...formData, address1: e.target.value });
                                                                    handleChange(e);
                                                                }}
                                                            />
                                                            <ErrorMessage
                                                                component="div"
                                                                name="address"
                                                                className="invalid-feedback"
                                                            />
                                                            <Field className="form-control border-0 border-bottom my-2" type="text" placeholder="Line 2"
                                                                value={formData.address2}
                                                                onChange={(e) => {
                                                                    setFormData({ ...formData, address2: e.target.value });
                                                                    handleChange(e);
                                                                }}
                                                            />
                                                            <Field className="form-control border-0 border-bottom" type="text" placeholder="Line 3"
                                                                value={formData.address3}
                                                                onChange={(e) => {
                                                                    setFormData({ ...formData, address3: e.target.value });
                                                                    handleChange(e);
                                                                }}
                                                            />
                                                        </div>
                                                        <div className="w-auto">
                                                            <div className="mb-4 form-group">
                                                                <label htmlFor="pow" className="text-primary fw-bold form-label ms-2">Place of work*</label>
                                                                <Field
                                                                    type="text"
                                                                    name="pow"
                                                                    placeholder="Work name"
                                                                    className={`form-control border-0 border-bottom ${touched.pow && errors.pow ? "is-invalid" : ""}`}
                                                                    value={formData.workPlace}
                                                                    onChange={(e) => {
                                                                        setFormData({ ...formData, workPlace: e.target.value });
                                                                        handleChange(e);
                                                                    }}
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
                                                                    className={`form-control border-0 border-bottom ${touched.district && errors.district ? "is-invalid" : ""}`}
                                                                    value={formData.district}
                                                                    onChange={(e) => {
                                                                        setFormData({ ...formData, district: e.target.value });
                                                                        handleChange(e);
                                                                    }}
                                                                />
                                                                <ErrorMessage
                                                                    component="div"
                                                                    name="district"
                                                                    className="invalid-feedback"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                //========== FORM STEP 2 ===========//
                                                : step == 2 ?
                                                    <div>
                                                        <div className="my-4 my-lg-5 w-100 d-flex flex-column flex-sm-row justify-content-center justify-content-md-between">
                                                            <div className="w-auto me-sm-5 mb-4 mb-sm-0 form-group">
                                                                <label htmlFor="clubName" className="text-primary fw-bold form-label ms-2">Student Club*</label>
                                                                <Field
                                                                    type="text"
                                                                    name="clubName"
                                                                    placeholder="Student club name"
                                                                    className={`form-control border-0 border-bottom ${touched.clubName && errors.clubName ? "is-invalid" : ""}`}
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
                                                                    className={`form-control border-0 border-bottom ${touched.uniName && errors.uniName ? "is-invalid" : ""}`}
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
                                                                            <input id="support-yes" className="form-check-input" type="radio"
                                                                            onChange={(e) => { //TODO: FIX!
                                                                                setFormData({ ...formData, externalSupport: "true" });
                                                                                handleChange(e);
                                                                            }} />
                                                                            <label id="support-yes" className="form-check-label ms-2">Yes</label>
                                                                        </div>
                                                                        <div className="form-check">
                                                                            <input id="support-no" className="form-check-input" type="radio"
                                                                            onChange={(e) => { //TODO: FIX!
                                                                                setFormData({ ...formData, externalSupport: "false" });
                                                                                handleChange(e);
                                                                            }} />
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
                                                                    className={`form-control border-0 border-bottom ${touched.contactName && errors.contactName ? "is-invalid" : ""}`}
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
                                                                    className={`form-control border-0 border-bottom ${touched.contactRole && errors.contactRole ? "is-invalid" : ""}`}
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
                                                                    className={`form-control border-0 border-bottom ${touched.contactNo && errors.contactNo ? "is-invalid" : ""}`}
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
                                                                    className={`form-control border-0 border-bottom ${touched.contactEmail && errors.contactEmail ? "is-invalid" : ""}`}
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
                                                                    className={`form-control border-0 border-bottom ${touched.supportName && errors.supportName ? "is-invalid" : ""}`}
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
                                                    </div>

                                                    //========== INVALID FORM STEP ===========//
                                                    : ''
                                        }
                                    </Form>
                                )}
                            </Formik>
                        </div>
                        <div className="w-100 d-flex justify-content-end align-items-center">
                            <small>Have an account? <Link href="/login">Log in</Link></small>
                            <button className="btn btn-lg btn-outline"
                                disabled={step == 0}
                                onClick={() => {
                                    setStep((currStep) => currStep - 1);
                                }}
                            >
                                Back
                            </button>
                            <div className={`hover-button ${submitShow ? "d-none" : ""
                                }`}>
                                <button className="btn btn-lg btn-secondary"
                                    disabled={step == 2} //This prevents the third component from being navigatible when not selected
                                    onClick={() => {
                                        setStep((currStep) => currStep + 1);
                                    }}
                                >
                                    Next
                                </button>
                            </div>
                            <div className={`hover-button ${submitShow ? "" : "d-none"
                                }`}>
                                <button className="btn btn-lg btn-secondary"
                                    type="submit"
                                    onClick={() => {
                                        handleSignup(formData); //WHERE WE CONNECT TO SHEET.JS
                                    }}
                                >
                                    Sign up
                                </button>
                            </div>
                        </div>
                        <p className="d-flex justify-content-end invalid-feedback">
                            {formSubmitErr}
                        </p>
                    </div>
                </div>
                <Benefits content={data.find(file => file.slug === "offers")} />
            </section>
        </Layout>
    )
}

export async function getStaticProps() {
    // Get files from the other information sub-directory
    const files = fs.readdirSync(path.join('markdown/sign-up'))

    // Get slug and markdown from other information
    const data = files.map((filename) => {
        const slug = filename.replace('.md', '')
        const markdown = fs.readFileSync(path.join('markdown/sign-up', filename), 'utf-8')

        let { data: frontmatter, content, sections } = matter(markdown, {
            section: function (section, file) {
                section.content = section.content.trim() + '\n';
            }
        });

        if (sections === undefined) { sections = {}; }

        return {
            slug,
            frontmatter,
            content,
            sections
        }
    })

    return {
        props: {
            data
        }
    }
}
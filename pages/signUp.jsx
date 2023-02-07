import React, { useState, useEffect } from 'react'
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
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip as ReactTooltip } from "react-tooltip";
import fetchJson from '../lib/fetchJson'
import ClipLoader from "react-spinners/ClipLoader";

//Get a list of all countries sorted by name
const { getData: getCountryData } = require('country-list');
const countries = getCountryData().sort((a, b) => a.name.localeCompare(b.name));
const provinces = [
    ["EC", "Eastern Cape"],
    ["FS", "Free State"],
    ["GP", "Gauteng"],
    ["KZN", "KwaZulu-Natal"],
    ["LP", "Limpopo"],
    ["MP", "Mpumalanga"],
    ["NC", "Northern Cape"],
    ["NW", "North West"],
    ["WC", "Western Cape"],
];

export default function SignUp({ data }) {
    const { mutateUser } = useUser({
        //Check if user is already logged in, if so redirect to profile page
        redirectTo: '/portal',
        redirectIfFound: true
    });

    const initVals = {
        firstName: "",
        surname: "",
        email: "",
        password: "",

        cellNo: "",
        workNo: "",
        country: "ZA",
        province: "EC",
        address1: "",
        address2: "",
        address3: "",
        workPlace: "",
        district: "",

        signUpReason: "health-interest",
        jobDescription: "medical-officer",
        employmentArea: 'private-sector',
        workArea: '',
        professionalNumber: '',

        clubName: "",
        uniName: "",
        externalSupport: "false",
        contactName: "",
        contactRole: "",
        contactNo: "",
        contactEmail: "",
        supportName: "",

        privacyPolicy: false
    };

    // Object that stores information across all components/stages of the form
    const [formData, setFormData] = useState({ ...initVals });

    //Get/update the main signup form error box for when something goes wrong while submitting
    const [formSubmitErr, setFormSubmitErr] = useState("");
    const [step, setStep] = useState(0);

    // Called when form submitted to pass data to the sheets.js API
    const handleSignup = async (vals) => {
        const payload = {
            type: "signup",
            data: vals
        }

        try {
            const response = await fetch('/api/sheets', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            }).then(resp => resp.json());

            if (response.status == "error") {
                if ("code" in response) {
                    switch (response.code) {
                        case "emailTaken":
                        case "policyRejected":
                        case "invalidSignup":
                            setFormSubmitErr(response.message); //Messages are set in sheets.js
                            break;

                        default:
                            setFormSubmitErr("Something went wrong while trying to sign up. Please try again later.");
                            break;
                    }
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

            // console.log(response);

        } catch (error) {
            setFormSubmitErr("Failed to connect to server");
        }
    }

    let submitShow = false;
    if (step == 3 || (step == 2 && formData.signUpReason !== "rhc"))
        submitShow = true;

    //The validation schema that checks input is correct on the client side
    const GeneralSchema = Yup.object().shape({
        //===== GENERAL =====//
        firstName: Yup.string()
            .matches(
                /^([a-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff]*)$/gi,
                'First name can only contain letters'
            )
            .required("Please enter your first name"),
        surname: Yup.string()
            .matches(
                /^([a-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff]*)$/gi,
                'Surname can only contain letters'
            )
            .required("Please enter your surname"),
        email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
        password: Yup.string()
            .required("Password is required")
            .min(8, "Password must be at least 8 characters long")
            .matches(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}$/, "Password must contain an uppercase and lowercase letter and a number"),
    });

    const AddressSchema = Yup.object().shape({
        //===== ADDRESS =====//
        address1: Yup.string()
            .required("Please provide an address"),
        workPlace: Yup.string()
            .required("Place of work is required"),
        district: Yup.string()
            .required("District is required"),
        cellNo: Yup.string()
            .matches(
                /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
                'Invalid phone number')
            .required("Cell no. is required"),
        workNo: Yup.string()
            .matches(
                /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
                'Invalid phone number'),
    });

    const RoleSchema = Yup.object().shape({
        //===== ROLE =====//
        signUpReason: Yup.string(),
        jobDesc: Yup.string(),
        employmentArea: Yup.string(),
        workArea: Yup.string()
            .max(100, "Work area must be less than 100 characters")
            .required("Work area is required"),
        professionalNumber: Yup.string(),
        privacyPolicy: Yup.boolean()
            .when("other", {
                is: () => { return submitShow; }, //Don't validate privacyPolicy unless the "Sign up" button is visible
                then: Yup.boolean()
                    .isTrue("Please accept our policies")
            })
    });

    const ClubSchema = Yup.object().shape({
        //===== HEALTH CLUB =====//
        clubName: Yup.string()
            .matches(
                /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
                'Club name can only contain letters'
            )
            .required("Please enter your club name"),

        uniName: Yup.string()
            .matches(
                /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
                'University name can only contain letters'
            )
            .required("University is required"),
        contactName: Yup.string()
            .matches(
                /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
                'Contact name can only contain letters'
            )
            .required("Name is required"),
        contactRole: Yup.string()
            .matches(
                /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
                'Contact role can only contain letters'
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
                'Name can only contain letters'
            )
            .required("Name is required"),

        privacyPolicy: Yup.boolean()
            .isTrue("Please accept our policies"),
    });

    const Schema = [GeneralSchema, AddressSchema, RoleSchema, ClubSchema];

    return (
        <Layout pageTitle="RuDASA | Sign up" hide="true">
            <section>
                <div className="py-5 mb-5 container"></div>
                <div className="d-flex justify-content-center align-items-start mb-5 pb-5">
                    <Image src={Illustration} className="col-12 col-md-12 col-lg-5 col-xl-5" width={600} height={600} alt="Illustration" />
                    <div className="col-12 col-md-12 col-lg-5 col-xl-5 offset-md-1 offset-lg-1 d-flex flex-column align-items-center">
                        <h1 className="fw-bold w-100 mb-5 text-center text-primary">Sign Up</h1>
                        <ProgressBar step={step} rhc={formData.signUpReason === "rhc"} />
                        <div className="w-auto">
                            <Formik
                                initialValues={{ ...initVals }}
                                validationSchema={Schema[step]}

                                enableReinitialize
                                validateOnMount
                                isInitialValid={false}
                                onSubmit={async (values, { setSubmitting }) => {
                                    setSubmitting(true);
                                    await handleSignup(formData); //WHERE WE CONNECT TO SHEET.JS
                                    setSubmitting(false);
                                }}
                            >
                                {({ errors, touched, handleChange, isValid, validateForm, isSubmitting }) => {

                                    //eslint-disable-next-line react-hooks/rules-of-hooks
                                    useEffect(() => {
                                        validateForm();
                                        //eslint-disable-next-line react-hooks/exhaustive-deps
                                    }, [step, submitShow]); //Must validate when submitShow changes for privacyPolicy

                                    return (
                                        <Form className="px-3 px-md-0">
                                            {
                                                //========== FORM STEP 0 - GENERAL ===========//
                                                step == 0 ?
                                                    <div>
                                                        {/* Name and Surname */}
                                                        <div className="my-4 my-lg-5 w-100 d-flex flex-column flex-sm-row justify-content-center justify-content-md-between">
                                                            <div className="w-auto me-sm-5 mb-4 mb-sm-0 form-group">
                                                                <label htmlFor="firstName" className="text-primary fw-bold form-label ms-2">Name*</label>
                                                                <Field
                                                                    type="text"
                                                                    name="firstName"
                                                                    placeholder="First Name"
                                                                    className={`form-control border-0 border-bottom ${touched.firstName && errors.firstName ? "is-invalid" : ""}`}
                                                                    value={formData.firstName}
                                                                    onChange={(e) => {
                                                                        setFormData({ ...formData, firstName: e.target.value });
                                                                        handleChange(e);
                                                                    }}
                                                                />
                                                                <ErrorMessage
                                                                    component="div"
                                                                    name="firstName"
                                                                    className="invalid-feedback"
                                                                />
                                                            </div>
                                                            <div className="w-auto form-group">
                                                                <label htmlFor="surname" className="text-primary fw-bold form-label ms-2">Surname*</label>
                                                                <Field
                                                                    type="text"
                                                                    name="surname"
                                                                    placeholder="Surname"
                                                                    className={`form-control border-0 border-bottom ${touched.surname && errors.surname ? "is-invalid" : ""}`}
                                                                    value={formData.surname}
                                                                    onChange={(e) => {
                                                                        setFormData({ ...formData, surname: e.target.value });
                                                                        handleChange(e);
                                                                    }}
                                                                />
                                                                <ErrorMessage
                                                                    component="div"
                                                                    name="surname"
                                                                    className="invalid-feedback"
                                                                />
                                                            </div>
                                                        </div>

                                                        {/* Email and Password */}
                                                        <div className="mb-5 w-100 d-flex flex-column flex-sm-row justify-content-center justify-content-md-between">
                                                            <div className="w-auto me-sm-5 mb-4 mb-sm-0 form-group">
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
                                                            <div className="w-auto form-group">
                                                                <label htmlFor="password" id="password-tooltip" className="text-primary fw-bold form-label ms-2">
                                                                    Password*
                                                                    <span className="text-muted fw-normal ms-2 tooltip-text">
                                                                        ?
                                                                        <ReactTooltip
                                                                            anchorId="password-tooltip"
                                                                            place="right"
                                                                            content="For the members-only portal"
                                                                        />
                                                                    </span>
                                                                </label>
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
                                                        </div>
                                                    </div>
                                                    //========== FORM STEP 1 - ADDRESS ===========//
                                                    : step == 1 ?
                                                        <div>
                                                            {/* Country and Province */}
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
                                                                {formData.country == "ZA" ? //Hide province when ZA not selected
                                                                    <div className="w-auto form-group" style={{ minWidth: '45%' }}>
                                                                        <label htmlFor="province" className="text-primary fw-bold form-label">Province*</label>
                                                                        <select id="province" className="form-select border-0 border-bottom" aria-label="province" value={formData.province} onChange={(e) => setFormData({ ...formData, province: e.target.value })}>
                                                                            {
                                                                                provinces.map(([code, name]) => (
                                                                                    <option key={code} value={code}>{name}</option>
                                                                                ))
                                                                            }
                                                                        </select>
                                                                    </div>
                                                                    : ""}
                                                            </div>

                                                            {/* Phone numbers */}
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

                                                            {/* Address */}
                                                            <div className="my-4 my-lg-5 w-100 d-flex flex-column flex-sm-row justify-content-center justify-content-md-between">
                                                                <div className="w-auto me-sm-5 mb-4 mb-sm-0 form-group">
                                                                    <label htmlFor="address1" id="address-tooltip" className="text-primary fw-bold form-label ms-2">
                                                                        Work Address*
                                                                        <span className="text-muted fw-normal ms-2 tooltip-text">
                                                                            ?
                                                                            <ReactTooltip
                                                                                anchorId="address-tooltip"
                                                                                place="right"
                                                                                content="Place of study if student"
                                                                            />
                                                                        </span>
                                                                    </label>
                                                                    <Field
                                                                        type="text"
                                                                        name="address1"
                                                                        placeholder="Line 1"
                                                                        className={`form-control border-0 border-bottom ${touched.address1 && errors.address1 ? "is-invalid" : ""}`}
                                                                        value={formData.address1}
                                                                        onChange={(e) => {
                                                                            setFormData({ ...formData, address1: e.target.value });
                                                                            handleChange(e);
                                                                        }}
                                                                    />
                                                                    <ErrorMessage
                                                                        component="div"
                                                                        name="address1"
                                                                        className="invalid-feedback"
                                                                    />
                                                                    <Field className="form-control border-0 border-bottom my-2" type="text" placeholder="Line 2"
                                                                        name="address2"
                                                                        value={formData.address2}
                                                                        onChange={(e) => {
                                                                            setFormData({ ...formData, address2: e.target.value });
                                                                            handleChange(e);
                                                                        }}
                                                                    />
                                                                    <Field className="form-control border-0 border-bottom" type="text" placeholder="Line 3"
                                                                        name="address3"
                                                                        value={formData.address3}
                                                                        onChange={(e) => {
                                                                            setFormData({ ...formData, address3: e.target.value });
                                                                            handleChange(e);
                                                                        }}
                                                                    />
                                                                </div>
                                                                <div className="w-auto">
                                                                    <div className="mb-4 form-group">
                                                                        <label htmlFor="workPlace" className="text-primary fw-bold form-label ms-2">Place of work*</label>
                                                                        <Field
                                                                            type="text"
                                                                            name="workPlace"
                                                                            placeholder="Work name"
                                                                            className={`form-control border-0 border-bottom ${touched.workPlace && errors.workPlace ? "is-invalid" : ""}`}
                                                                            value={formData.workPlace}
                                                                            onChange={(e) => {
                                                                                setFormData({ ...formData, workPlace: e.target.value });
                                                                                handleChange(e);
                                                                            }}
                                                                        />
                                                                        <ErrorMessage
                                                                            component="div"
                                                                            name="workPlace"
                                                                            className="invalid-feedback"
                                                                        />
                                                                    </div>
                                                                    <div className="form-group">
                                                                        <label htmlFor="district" className="text-primary fw-bold form-label ms-2">District*</label>
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
                                                        //========== FORM STEP 2 - ROLE ===========//
                                                        : step == 2 ?
                                                            <div>
                                                                {/* Sign up reason and Job Description */}
                                                                <div className="my-5 w-100 d-flex flex-column flex-sm-row justify-content-center justify-content-md-between">
                                                                    <div className="w-auto me-sm-5 mb-4 mb-sm-0 form-group">
                                                                        <label htmlFor="reason" className="text-primary fw-bold form-label ms-2">Reason for sign up*</label>
                                                                        <select id="reason" className="form-select border-0 border-bottom" aria-label="reason" value={formData.signUpReason} onChange={(e) => setFormData({ ...formData, signUpReason: e.target.value })}>
                                                                            <option value="health-interest">Interest in rural health</option>
                                                                            <option value="information">Information</option>
                                                                            <option value="onboarding">Onboarding programme</option>
                                                                            <option value="rhc">Rural Health Club (Students)</option>
                                                                            <option value="event">Events</option>
                                                                        </select>
                                                                    </div>
                                                                    <div className="w-auto form-group">
                                                                        <label htmlFor="jobDesc" className="text-primary fw-bold form-label ms-2">Job Description*</label>
                                                                        <select id="jobDesc" className="form-select border-0 border-bottom" aria-label="jobDesc" value={formData.jobDescription} onChange={(e) => setFormData({ ...formData, jobDescription: e.target.value })}>
                                                                            <option value="medical-officer">Medical officer/GP</option>
                                                                            <option value="community-service">Community service</option>
                                                                            <option value="intern">Intern</option>
                                                                            <option value="medical-student">Medical student</option>
                                                                            <option value="academic">Academic/lecturer/trainer</option>
                                                                            <option value="registrar">Registrar</option>
                                                                            <option value="consultant">Consultant</option>
                                                                            <option value="other-health-professional">Other health professional</option>
                                                                            <option value="non-health-professional">Non health professional</option>
                                                                        </select>
                                                                    </div>
                                                                </div>

                                                                {/* Employment Area and Work Area */}
                                                                <div className="mb-5 w-100 d-flex flex-column flex-sm-row justify-content-center justify-content-md-between">
                                                                    <div className="w-auto me-sm-5 mb-4 mb-sm-0 form-group">
                                                                        <label htmlFor="employmentArea" className="text-primary fw-bold form-label ms-2">Employment Area*</label>
                                                                        <select id="employmentArea" className="form-select border-0 border-bottom" aria-label="reason" value={formData.employmentArea} onChange={(e) => setFormData({ ...formData, employmentArea: e.target.value })}>
                                                                            <option value="private-sector">Private sector</option>
                                                                            <option value="public-sector">Public sector</option>
                                                                            <option value="training-institute">Training institute</option>
                                                                            <option value="ngo">NGO</option>
                                                                            <option value="student">Student</option>
                                                                        </select>
                                                                    </div>

                                                                    <div className="w-auto form-group">
                                                                        <label htmlFor="workArea" className="text-primary fw-bold form-label ms-2">Work Area*</label>
                                                                        <Field
                                                                            type="text"
                                                                            name="workArea"
                                                                            placeholder="Work Area"
                                                                            className={`form-control border-0 border-bottom ${touched.workArea && errors.workArea ? "is-invalid" : ""}`}
                                                                            value={formData.workArea}
                                                                            onChange={(e) => {
                                                                                setFormData({ ...formData, workArea: e.target.value });
                                                                                handleChange(e);
                                                                            }}
                                                                        />
                                                                        <ErrorMessage
                                                                            component="div"
                                                                            name="workArea"
                                                                            className="invalid-feedback"
                                                                        />
                                                                    </div>
                                                                </div>

                                                                {/* Work Area and Professional number */}
                                                                <div className="mb-5 w-100 d-flex flex-column flex-sm-row justify-content-center justify-content-md-between">
                                                                    <div className="w-auto form-group">
                                                                        <label htmlFor="professionalNumber" className="text-primary fw-bold form-label ms-2">Professional Number</label>
                                                                        <Field
                                                                            type="text"
                                                                            name="professionalNumber"
                                                                            placeholder="Professional Number"
                                                                            className={`form-control border-0 border-bottom ${touched.professionalNumber && errors.professionalNumber ? "is-invalid" : ""}`}
                                                                            value={formData.professionalNumber}
                                                                            onChange={(e) => {
                                                                                setFormData({ ...formData, professionalNumber: e.target.value });
                                                                                handleChange(e);
                                                                            }}
                                                                        />
                                                                        <ErrorMessage
                                                                            component="div"
                                                                            name="professionalNumber"
                                                                            className="invalid-feedback"
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            //========== FORM STEP 3 - CLUB ===========//
                                                            : step == 3 ?
                                                                <div>
                                                                    {/* Student Club and Support */}
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
                                                                                        <input id="support-yes" className="form-check-input" type="radio" name="support"
                                                                                            onChange={(e) => {
                                                                                                setFormData({ ...formData, externalSupport: "true" });
                                                                                                handleChange(e);
                                                                                            }} />
                                                                                        <label id="support-yes" className="form-check-label ms-2">Yes</label>
                                                                                    </div>
                                                                                    <div className="form-check">
                                                                                        <input id="support-no" className="form-check-input" type="radio" name="support"
                                                                                            onChange={(e) => {
                                                                                                setFormData({ ...formData, externalSupport: "false" });
                                                                                                handleChange(e);
                                                                                            }} />
                                                                                        <label id="support-no" className="form-check-label ms-2 checked">No</label>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    {/* Other contacts */}
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

                                                                // ========== INVALID FORM STEP ===========//
                                                                : ''
                                            }

                                            {/* Privacy policy checkbox */}
                                            {
                                                submitShow &&
                                                <div className="w-100 d-flex justify-content-center my-5">
                                                    <div className="form-check">
                                                        <Field
                                                            type="checkbox"
                                                            name="privacyPolicy"
                                                            className={`form-check-input ${touched.privacyPolicy && errors.privacyPolicy ? "is-invalid" : ""}`}
                                                            checked={formData.privacyPolicy}
                                                            onChange={(e) => {
                                                                setFormData({ ...formData, privacyPolicy: !formData.privacyPolicy });
                                                                handleChange(e);
                                                            }}
                                                        />
                                                        <label className="form-check-label" htmlFor="privacyPolicy">
                                                            I agree to the <a href="/privacy-policy.html" target="_blank">Privacy Policy</a>, <a href="/pdfs/value-statement.pdf" target="_blank">Value Statement</a> and <a href="/pdfs/code-of-conduct.pdf" target="_blank">Code of Conduct</a><label className="text-primary fw-bold form-label ms-2">*</label>
                                                        </label>
                                                        <ErrorMessage
                                                            component="div"
                                                            name="privacyPolicy"
                                                            className="invalid-feedback"
                                                        />
                                                    </div>
                                                </div>
                                            }


                                            {/* ========== SUBMIT STEP =========== */}
                                            <div className="w-100 d-flex flex-column flex-sm-row justify-content-end align-items-end align-items-sm-center">
                                                <small>Have an account? <Link href="/login">Log in</Link></small>
                                                <div className='d-flex mt-4 mt-sm-0'>
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
                                                            disabled={!isValid}
                                                            onClick={() => {
                                                                setStep((currStep) => currStep + 1);
                                                            }}
                                                        >
                                                            Next
                                                        </button>
                                                    </div>
                                                    <div className={`hover-button ${submitShow ? "" : "d-none"}`}>
                                                        <button className="btn btn-lg btn-secondary"
                                                            type="submit"
                                                            disabled={!isValid}
                                                        >
                                                            {
                                                                isSubmitting
                                                                    ? <ClipLoader color="#fff" size={20} cssOverride={{ margin: "0 15px" }} />
                                                                    : "Sign Up"
                                                            }
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <p className="d-flex justify-content-end invalid-feedback">
                                                {formSubmitErr}
                                            </p>
                                        </Form>
                                    )
                                }}
                            </Formik>
                        </div>
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
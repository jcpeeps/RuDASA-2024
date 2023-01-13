import React from 'react'
import Image from 'next/image'
import Illustration3 from '../../media/svg/contact.svg'
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import useUser from '../../pages/api/useUser';
import fetchJson from '../../lib/fetchJson'

export default function ContactForm() {

    // Fetch the user session client-side
    const { user } = useUser({
        redirectTo: '/',
        redirectIfFound: true //Set to true to prevent instant redirect when not signed in
    });

    let isLoading = false;
    // Server-render loading state
    if (!user || user.isLoggedIn === false) {
        isLoading = true;
    }

    const initVals = {
        fullName: "",
        email: "",
        subject: "",
        msg: "",
    };

    const handleContact = async (vals) => {

        const payload = {
            type: "contact",
            data: vals
        }

        try {
            const response = await fetch('/api/contact', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(payload)
            }).then(resp => resp.json());

            if (response.status == "error") {
                if ("code" in response)
                {
                    switch (response.code) {
                        case "invalidContact":
                            setFormSubmitErr(response.message); //Messages are set in contact.js
                            break;

                        default:
                            setFormSubmitErr("Something went wrong while trying to send your message. Please try again later.");
                            break;
                    }
                }
            }
            else //Contact form submission was successful
            {
                // const response = await fetchJson('/api/login', {
                //     method: "POST",
                //     headers: { "Content-Type": "application/json" },
                //     body: JSON.stringify(loginVals)
                // });
            }

            console.log(response);

        } catch (error) {
            console.error("FATAL ERROR\n" + error);
        }
    }

    const Schema = Yup.object({
        fullName: Yup.string()
            .required("Please enter your full name"),
        email: Yup.string()
            .email("Please enter a valid email address")
            .required("Please enter your email address"),
        subject: Yup.string()
            .max(50, "Subject must be less than 50 characters")
            .required("Please provide a subject"),
        msg: Yup.string()
            .max(500, "Message must be less than 500 characters")
            .required("Please enter a message"),
    });


    return (
        <section>
            <div className="py-5 mb-5"></div>
            <div className="container d-flex justify-content-center align-items-center mb-5 pb-5">
                <div className="d-none d-lg-block">
                    <Image src={Illustration3} width={600} height={600} alt="" />
                </div>

                <div className="px-2 px-lg-4 d-flex flex-column align-items-center ms-lg-5">
                    <h3 className="fw-bold w-100 mb-4">Contact us</h3>
                    <Formik
                        initialValues={{ ...initVals }}
                        validationSchema={Schema}

                        enableReinitialize
                        validateOnMount
                        isInitialValid={false}
                        onSubmit={(values, { setSubmitting, resetForm }) => {
                            setSubmitting(true);
                            handleContact(values);
                            resetForm();
                            setSubmitting(false);
                        }}
                    >
                        {({ errors, touched, handleChange, isValid, validateForm }) => {

                            return (
                                <Form>
                                    <div className="mt-3 w-100 d-flex flex-column flex-md-row justify-content-between">
                                        <div className="w-auto me-md-5 mb-4 mb-md-0 form-group">
                                            <label htmlFor="fullName" className="text-primary fw-bold form-label ms-2">Full Name</label>
                                            <Field
                                                type="text"
                                                name="fullName"
                                                placeholder="Full Name"
                                                className={`form-control border-0 border-bottom ${touched.fullName && errors.fullName ? "is-invalid" : ""}`}
                                            />
                                            <ErrorMessage
                                                component="div"
                                                name="fullName"
                                                className="invalid-feedback"
                                            />
                                        </div>
                                        <div className="w-auto form-group">
                                            <label htmlFor="email" className="text-primary fw-bold form-label ms-2">Email Address</label>
                                            <Field
                                                type="email"
                                                name="email"
                                                placeholder="Email Address"
                                                className={`form-control border-0 border-bottom ${touched.email && errors.email ? "is-invalid" : ""}`}
                                            />
                                            <ErrorMessage
                                                component="div"
                                                name="email"
                                                className="invalid-feedback"
                                            />
                                        </div>
                                    </div>
                                    <div className="my-4 my-md-5 w-100">
                                        <div className="">
                                            <label htmlFor="subject" className="text-primary fw-bold form-label ms-2">Subject</label>
                                            <Field
                                                type="text"
                                                name="subject"
                                                placeholder="Subject"
                                                className={`form-control border-0 border-bottom ${touched.subject && errors.subject ? "is-invalid" : ""}`}
                                            />
                                            <ErrorMessage
                                                component="div"
                                                name="subject"
                                                className="invalid-feedback"
                                            />
                                        </div>
                                    </div>
                                    <div className="mt-3 w-100">
                                        <div className="">
                                            <label htmlFor="msg" className="text-primary fw-bold form-label ms-2">Message</label>
                                            {/* <textarea id="msg" className="w-100 h-100 border-0 border-bottom ms-2 p-3 bg-light" rows="8" placeholder="Type here..." /> */}
                                            <Field
                                                as="textarea"
                                                name="msg"
                                                placeholder="Type here..."
                                                className={`w-100 h-100 border-0 border-bottom ms-2 p-3 bg-light ${touched.msg && errors.msg ? "is-invalid" : ""}`} rows="8"
                                            />
                                            <ErrorMessage
                                                component="div"
                                                name="msg"
                                                className="invalid-feedback"
                                            />
                                        </div>
                                    </div>
                                    <div className="text-end w-100 my-4 hover-button">
                                        <button 
                                            type="submit" 
                                            className="btn btn-secondary btn-lg" 
                                            disabled={!isValid}
                                        >
                                            Send
                                        </button>
                                    </div>
                                </Form>
                            )
                        }}
                    </Formik>
                </div>
            </div>
        </section>
    )
}
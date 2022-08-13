import React from 'react'
import Layout from '../components/Layout'
import Image from 'next/image'
import Illustration from '../media/svg/login.svg'
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function login() {

    const LoginSchema = Yup.object({
        email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
        password: Yup.string()
            // .min(5, "Password must be minimum 5 characters")
            .required("Password is required")
    });

    // Called when form submitted to pass data to the sheets.js API
    const handleLogin = async (vals) => {

        const payload = {
            type: "login",
            data: vals
        }

        const response = await fetch('/api/sheets', {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload)
        });

        const content = await response.json();
        // alert(content.data);
        // alert(content.data.tableRange);

        console.log(content);
    }

    return (
        <Layout pageTitle="RuDASA | Login" hide="true">
            <section className="container">
                <div className="py-5 mb-5"></div>
                <div className="d-flex justify-content-center align-items-center mb-5 pb-5">
                    <Image src={Illustration} className="col-sm-12 col-md-12 col-lg-5 col-xl-5" width={600} height={600} alt="Illustration"/>
                    <div className="col-sm-12 col-md-12 col-lg-5 col-xl-5 px-4 d-flex flex-column align-items-center ms-5">
                        <h1 className="fw-bold w-100 mb-5 text-center text-primary">Login</h1>

                        {/* FORM STARTS HERE */}
                        <Formik
                            initialValues={{ email: "test@email.com", password: "" }}
                            validationSchema={LoginSchema}

                            onSubmit={(values, { setSubmitting }) => {
                                alert("DEBUG OUTPUT:\n" + JSON.stringify(values));
                                handleLogin(values); // WHERE WE CONNECT TO SHEETS.JS
                                setSubmitting(false);
                            }}
                        >

                            {({ touched, errors, isSubmitting }) => (
                                <Form className="mt-3 w-100 ms-5">
                                    <div>
                                        <div className="form-group">
                                            <label htmlFor="email" className="text-primary fw-bold form-label ms-2">Email Address</label>
                                            <Field
                                                type="email"
                                                name="email"
                                                placeholder="Email"
                                                className={`form-control border-0 border-bottom ${touched.email && errors.email ? "is-invalid" : ""
                                                    }`}
                                            />
                                            <ErrorMessage
                                                component="div"
                                                name="email"
                                                className="invalid-feedback"
                                            />
                                        </div>
                                        <div className="form-group mt-5">
                                            <label htmlFor="password" className="text-primary fw-bold form-label ms-2">Password</label>
                                            <Field
                                                type="password"
                                                name="password"
                                                placeholder="Password"
                                                className={`form-control border-0 border-bottom ${touched.password && errors.password ? "is-invalid" : ""
                                                    }`}
                                            />
                                            <ErrorMessage
                                                component="div"
                                                name="password"
                                                className="invalid-feedback"
                                            />
                                        </div>
                                    </div>

                                    {/* LOGIN BUTTON */}
                                    <div className="w-100 my-4 d-flex justify-content-end align-items-center">
                                        <small className="me-3">Don't have an account? <a href="/signUp">Sign up</a></small>
                                        <div className="hover-button">
                                            <button
                                                type="submit"
                                                className="btn btn-secondary btn-lg"
                                                disabled={isSubmitting}
                                            >
                                                {isSubmitting ? "Please wait..." : "Login"}
                                            </button>
                                        </div>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </section>
        </Layout>
    )
}
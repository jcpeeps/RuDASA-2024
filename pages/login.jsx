import React, { useState } from 'react';
import Layout from '../components/Layout';
import Image from 'next/image';
import Link from 'next/link';
import Illustration from '../media/svg/login.svg';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import useUser from './api/useUser'

export default function Login() {

    const { user, mutateUser } = useUser({ 
    //Check if user is already logged in, if so redirect to profile page
        redirectTo: '/profile',
        redirectIfFound: true
    });

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

        try
        {
            const response = await fetch('/api/login', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(payload)
            });

            //Update session data
            const content = await response.json();
            // alert(JSON.stringify(content));
            if(content.status === "error")
            {
                alert(content.message);
            }
            else if(content.status === "success")
            {
                console.log(content); //TODO: Remove
            }
            mutateUser(content);

        } catch (error) {
            alert("FATAL ERROR\n" + error.data.message); //TODO: Replace
        }
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
                            initialValues={{ email: "ronald@gmail.com", password: "Password1!" }}
                            validationSchema={LoginSchema}

                            onSubmit={async (values, { setSubmitting }) => {
                                alert("DEBUG OUTPUT:\n" + JSON.stringify(values));
                                await handleLogin(values); //LOGIN API CALLING ROUTE
                                setSubmitting(false);
                                alert("USER: " + JSON.stringify(user));
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
                                        <small className="me-3">Don&apos;t have an account? <Link href="/signUp">Sign up</Link></small>
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
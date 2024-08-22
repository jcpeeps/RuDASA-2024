import React from 'react';
import Layout from '../components/Layout';
import Image from 'next/image';
import Link from 'next/link';
import Illustration from "/public/media/svg/login.svg";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import useUser from './api/useUser'
import fetchJson from '../lib/fetchJson'
import ClipLoader from "react-spinners/ClipLoader";

export default function Login() {

    const { mutateUser } = useUser({
        //Check if user is already logged in, if so redirect to profile page
        redirectTo: '/portal',
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

    // Called when form submitted
    const handleLogin = async (setFieldError, vals) => {
        try {
            const response = await fetchJson('/api/login', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(vals) // vals: { email: "...", password: "..." }
            });

            if (response.status == "failed" && ("code" in response)) {
                switch (response.code) {
                    case "invalidUser":
                        setFieldError("email", "A user with that email does not exist");
                        break;

                    case "invalidPass":
                        setFieldError("password", "Incorrect password");
                        break;

                    case "servErr":
                        setFieldError("email", "Failed to connect to server");
                        break;
                }
            }
            // console.log(response); //DEBUG: Logs user session on client side

            mutateUser(response);

        } catch (error) {
            setFieldError("email", "Failed to connect to server");
        }
    }

    return (
        <Layout pageTitle="RuDASA | Login" hide="true">
            <section className="container">
                <div className="py-5 mb-5"></div>
                <div className="d-flex justify-content-center align-items-center mb-5 pb-5">
                    <div className="d-none d-lg-block col-lg-5 col-xl-5">
                        <Image src={Illustration} width={600} height={600} alt="" />
                    </div>

                    <div className="col-sm-12 col-md-12 col-lg-5 col-xl-5 px-4 d-flex flex-column align-items-center ms--lg-5">
                        <h1 className="fw-bold w-100 mb-5 text-center text-primary">Login</h1>

                        {/* FORM STARTS HERE */}
                        <Formik
                            initialValues={{ email: "", password: "" }}
                            validationSchema={LoginSchema}

                            onSubmit={async (values, { setFieldError, setSubmitting }) => {
                                setSubmitting(true);
                                await handleLogin(setFieldError, values); //LOGIN API CALLING ROUTE
                                setSubmitting(false);
                            }}
                        >

                            {({ touched, errors, isSubmitting }) => (
                                <Form className="mt-3 w-100 ms-lg-5">
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
                                    <div className="my-4 w-100 d-flex flex-column flex-xl-row justify-content-end align-items-end align-items-xl-center">
                                        <small className="me-sm-3 mb-4 mb-sm-0">Don&apos;t have an account? <Link href="/signUp">Sign up</Link></small>
                                        <small className="me-sm-3 mb-4 mb-sm-0"><Link href="/passReset">Forgot password?</Link></small>
                                    </div>
                                    <div className="my-4 w-100 d-flex flex-column flex-sm-row justify-content-end align-items-end align-items-sm-center">
                                        <div className="hover-button">
                                            <button
                                                type="submit"
                                                className="btn btn-secondary btn-lg"
                                                disabled={isSubmitting}
                                            >
                                                {
                                                    isSubmitting
                                                        ? <ClipLoader color="#fff" size={20} cssOverride={{ margin: "0 15px" }} />
                                                        : "Login"
                                                }
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
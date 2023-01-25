import { React, useState } from 'react';
import Image from 'next/image';
import Illustration3 from '../../media/svg/reset-password.svg';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import fetchJson from '../../lib/fetchJson'
import ClipLoader from "react-spinners/ClipLoader";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';

export default function PassChange() {
    const router = useRouter();

    const [formSubmitErr, setFormSubmitErr] = useState("");

    const initVals = {
        password: "",
        passwordConfirm: ""
    };

    //Returns true if password change form submitted successfully, false otherwise
    const handlePassChange = async (vals) => {

        //== CHECK QUERY HAS ALL REQUIRED TOKEN PARAMS ==//
        if(!["em", "tk", "ts", "et"].every(x => x in router.query))
        {
            setFormSubmitErr("Invalid URL token. Please ensure you copied the link in its entirety.");
            return false;
        }

        const payload = {
            type: "passChange",
            data: {
                newPassword: vals.password,
                email: router.query.em,
                token: router.query.tk,
                timestamp: router.query.ts,
                entropy: router.query.et,
            }
        }

        console.log("SENDING PAYLOAD:");
        console.log(payload);

        try {
            const response = await fetch('/api/passChange', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(payload)
            }).then(resp => resp.json());

            console.log("RESPONSE FROM PASSCHANGE:");
            console.log(response);

            if (response.status == "error") {
                if ("code" in response) {
                    switch (response.code) {
                        // case "invalidPassword":
                        case "tokenExpired":
                        case "tokenAuthFailed":
                            setFormSubmitErr(response.message); //Messages are set in contact.js
                            return false;

                        default:
                            setFormSubmitErr("Something went wrong while trying to update your password. Please try again later.");
                            return false;
                    }
                }
            }
            else //Contact form submission was successful
            {
                return true;
            }

            console.log(response);

        } catch (error) {
            console.log("ERROR THROWN IN PASSCHANGE.JSX:");
            console.log(error);
            setFormSubmitErr("Failed to connect to server");
        }
    }

    const Schema = Yup.object({
        password: Yup.string()
            .required("Password is required")
            .min(8, "Password must be at least 8 characters long")
            .matches(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}$/, "Password must contain an uppercase and lowercase letter and a number"),
        passwordConfirm: Yup.string()
            .required("Password confirmation is required")
            .oneOf([Yup.ref("password"), null], "Passwords must match")
    });

    return (
        <section>
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover={false}
                theme="light"
            />
            <div className="py-5 mb-5"></div>
            <div className="container d-flex justify-content-center align-items-center mb-5 pb-5">
                <div className="d-none d-lg-block">
                    <Image src={Illustration3} width={600} height={600} alt="" />
                </div>

                <div className="px-2 px-lg-4 d-flex flex-column align-items-center ms-lg-5">
                    <h3 className="fw-bold w-100 mb-4">Update your password</h3>
                    <Formik
                        initialValues={{ ...initVals }}
                        validationSchema={Schema}

                        enableReinitialize
                        validateOnMount
                        isInitialValid={false}
                        onSubmit={async (values, { setSubmitting, resetForm }) => {
                            setSubmitting(true);
                            let submitSuccess = await handlePassChange(values);
                            setSubmitting(false);

                            if(submitSuccess) //If successful send
                            {
                                resetForm();
                                toast.success('Password updated successfully', {
                                    position: "top-right",
                                    autoClose: 2000,
                                    hideProgressBar: true,
                                    closeOnClick: true,
                                    pauseOnHover: false,
                                    draggable: true,
                                    progress: undefined,
                                    theme: "light",
                                });
                                setTimeout(() => {
                                    router.push("/");
                                }, 3000);
                            }
                        }}
                    >
                        {({ errors, touched, isValid, isSubmitting }) => {
                            return (
                                <Form>
                                    <div className="mt-3 w-100 d-flex flex-column justify-content-between">
                                        <div className="w-auto form-group">
                                            <label htmlFor="password" className="text-primary fw-bold form-label ms-2">New Password</label>
                                            <Field
                                                type="password"
                                                name="password"
                                                placeholder="New Password"
                                                className={`form-control border-0 border-bottom ${touched.password && errors.password ? "is-invalid" : ""}`}
                                            />
                                            <ErrorMessage
                                                component="div"
                                                name="password"
                                                className="invalid-feedback"
                                            />
                                        </div>

                                        <div className="w-auto form-group mt-5">
                                            <label htmlFor="passwordConfirm" className="text-primary fw-bold form-label ms-2">Confirm Password</label>
                                            <Field
                                                type="password"
                                                name="passwordConfirm"
                                                placeholder="Confirm Password"
                                                className={`form-control border-0 border-bottom ${touched.passwordConfirm && errors.passwordConfirm ? "is-invalid" : ""}`}
                                            />
                                            <ErrorMessage
                                                component="div"
                                                name="passwordConfirm"
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
                                            {
                                                isSubmitting
                                                    ? <ClipLoader color="#fff" size={20} cssOverride={{ margin: "0 15px" }} />
                                                    : "Update"
                                            }
                                        </button>
                                        <p className="d-flex justify-content-end invalid-feedback">
                                            {formSubmitErr}
                                        </p>
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
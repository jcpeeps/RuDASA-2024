import { React, useState } from 'react';
import Image from 'next/image';
import Illustration3 from '../../media/svg/reset-password.svg';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import ClipLoader from "react-spinners/ClipLoader";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function PassReset() {

    const [formSubmitErr, setFormSubmitErr] = useState("");

    const initVals = { email: "" };

    //Returns true if password reset form submitted successfully, false otherwise
    const handleReset = async (vals) => {

        const payload = {
            type: "passReset",
            data: vals
        }

        console.log("SENDING PAYLOAD:");
        console.log(payload);

        try {
            const response = await fetch('/api/passReset', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(payload)
            }).then(resp => resp.json())

            console.log("RESPONSE FROM PASSRESET:");
            console.log(response);

            setFormSubmitErr("");

            if (response.status == "error") {
                if ("code" in response) {
                    switch (response.code) {
                        case "invalidEmail":
                        case "transportErr":
                            setFormSubmitErr(response.message); //Messages are set in contact.js
                            return false;

                        default:
                            setFormSubmitErr("Something went wrong while trying to reset your password. Please try again later.");
                            return false;
                    }
                }
            }
            else //Contact form submission was successful
            {
                // case "resetRequestSuccess":
                return true;
            }

            // console.log(response);

        } catch (error) {
            console.log("ERROR THROWN IN PASSRESET.JSX:");
            console.log(JSON.stringify(error));
            setFormSubmitErr("Failed to connect to server");
        }
    }

    const Schema = Yup.object({
        email: Yup.string()
            .email("That's not a valid email address")
            .required("Please enter your email address"),
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
                    <h3 className="fw-bold w-100 mb-4">Reset your password</h3>
                    <Formik
                        initialValues={{ ...initVals }}
                        validationSchema={Schema}

                        enableReinitialize
                        validateOnMount
                        isInitialValid={false}
                        onSubmit={async (values, { setSubmitting, resetForm }) => {
                            setSubmitting(true);
                            let submitSuccess = await handleReset(values);
                            setSubmitting(false);

                            if(submitSuccess) //If successful send
                            {
                                resetForm();
                                toast.success('Reset link sent successfully.\nPlease check your email.', {
                                    position: "top-right",
                                    autoClose: 4000,
                                    hideProgressBar: true,
                                    closeOnClick: true,
                                    pauseOnHover: false,
                                    draggable: true,
                                    progress: undefined,
                                    theme: "light",
                                });
                            }
                        }}
                    >
                        {({ errors, touched, isValid, isSubmitting }) => {

                            return (
                                <Form>
                                    <div className="mt-3 w-100 d-flex flex-column flex-md-row justify-content-between">
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

                                    <div className="text-end w-100 my-4 hover-button">
                                        <button
                                            type="submit"
                                            className="btn btn-secondary btn-lg"
                                            disabled={!isValid}
                                        >
                                            {
                                                isSubmitting
                                                    ? <ClipLoader color="#fff" size={20} cssOverride={{ margin: "0 15px" }} />
                                                    : "Reset"
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
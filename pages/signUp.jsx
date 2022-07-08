import React, { useState } from 'react'
import Layout from '../components/Layout'
import Image from 'next/image'
import Illustration from '../media/svg/login.svg'
import General from '../components/signup-login/General'
import Address from '../components/signup-login/Address'
import Club from '../components/signup-login/Club'
import ProgressBar from '../components/signup-login/ProgressBar'
import Benefits from '../components/signup-login/Benefits'

export default function signUp() {

    // Object that stores information across all components
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        signUpReason: "",
        cellNo: "",
        workNo: "",

        country: "",
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
        contactEmail: "",
        supportName: ""
    })

    const [step, setStep] = useState(0);

    const stepDisplay = () => {
        switch (step) {
            case 0: return <General formData={formData} setFormData={setFormData} />
            case 1: return <Address formData={formData} setFormData={setFormData} />
            case 2: return <Club formData={formData} setFormData={setFormData} />
        }
    }

    return (
        <Layout pageTitle="RuDASA | Sign up" hide="true">
            <section>
                <div className="py-5 mb-5 container"></div>
                <div className="d-flex justify-content-center align-items-start mb-5 pb-5">
                    <Image src={Illustration} className="col-sm-12 col-md-12 col-lg-5 col-xl-5" width={600} height={600} />
                    <div className="col-sm-12 col-md-12 col-lg-5 col-xl-5 offset-md-1 offset-lg-1 d-flex flex-column align-items-center">
                        <h1 className="fw-bold w-100 mb-5 text-center text-primary">Sign Up</h1>
                        <ProgressBar step={step} />
                        <div className="w-100">
                            {stepDisplay()}
                        </div>
                        <div className="w-100 text-end">
                            <small>Have an account? <a href="/login">Log in</a></small>
                            <button className="btn btn-lg btn-outline"
                                disabled={step == 0}
                                onClick={() => {
                                    setStep((currStep) => currStep - 1);
                                }}
                            >
                                Back
                            </button>
                            <button className="btn btn-lg btn-secondary"
                                disabled={step == 2}
                                onClick={() => {
                                    setStep((currStep) => currStep + 1);
                                }}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
                <Benefits />
            </section>
        </Layout>
    )
}

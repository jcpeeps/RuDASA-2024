import React, { useState } from 'react'
import Layout from '../components/Layout'
import Image from 'next/image'
import Illustration from '../media/svg/login.svg'
import General from '../components/signup-login/General'
import Address from '../components/signup-login/Address'
import Club from '../components/signup-login/Club'

export default function signUp() {

    const [step, setStep] = useState(0);

    const stepDisplay = () => {
        switch (step) {
            case 0: return <General/>
            case 1: return <Address/>
            case 2: return <Club/>
        }
    }

    return (
        <Layout pageTitle="RuDASA | Sign up">
            <section className="container">
                <div className="py-5 mb-5"></div>
                <div className="d-flex justify-content-center align-items-center mb-5 pb-5">
                    <Image src={Illustration} className="col-sm-12 col-md-12 col-lg-5 col-xl-5" width={600} height={600} />
                    <h1 className="fw-bold w-100 mb-5 text-center text-primary">Sign Up</h1>
                    <div>
                        {stepDisplay()}
                    </div>
                    <div>
                        <button className="btn btn-outline"
                            disabled={step == 0}
                            onClick={() => {
                                setStep((currStep) => currStep - 1);
                            }}
                        >
                            Back
                        </button>
                        <button className="btn btn-secondary"
                            disabled={step == 2}
                            onClick={() => {
                                setStep((currStep) => currStep + 1);
                            }}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </section>
        </Layout>
    )
}

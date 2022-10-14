import React, { useState } from 'react'
import Layout from '../components/Layout'
import Image from 'next/image'
import Link from 'next/link'
import Illustration from '../media/svg/login.svg'
import General from '../components/signup-login/General'
import Address from '../components/signup-login/Address'
import Club from '../components/signup-login/Club'
import ProgressBar from '../components/signup-login/ProgressBar'
import Benefits from '../components/signup-login/Benefits'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import useUser from './api/useUser'

export default function SignUp({ data }) {
    const { mutateUser } = useUser({
    //Check if user is already logged in, if so redirect to profile page
        redirectTo: '/portal',
        redirectIfFound: true
    });

    // Object that stores information across all components/stages of the form
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
        contactNo: "",
        contactEmail: "",
        supportName: ""
    });

    // Called when form submitted to pass data to the sheets.js API
    const handleSignup = async (vals) => {
        // const payload = {
        //     type: "signup",
        //     data: vals
        // }

        // const response = await fetch('/api/sheets', {
        //     method: "POST",
        //     headers: {
        //         "Accept": "application/json",
        //         "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify(payload)
        // });
        // const content = await response.json();

        // console.log(content);
    }

    const [step, setStep] = useState(0);

    const stepDisplay = () => {
        switch (step) {
            case 0: return <General formData={formData} setFormData={setFormData} />
            case 1: return <Address formData={formData} setFormData={setFormData} />
            case 2: return <Club formData={formData} setFormData={setFormData} />
        }
    }

    let submitShow = false;
    if (step == 2 || (step == 1 && formData.signUpReason !== "rhc"))
        submitShow = true;

    return (
        <Layout pageTitle="RuDASA | Sign up" hide="true">
            <section>
                <div className="py-5 mb-5 container"></div>
                <div className="d-flex justify-content-center align-items-start mb-5 pb-5">
                    <Image src={Illustration} className="col-sm-12 col-md-12 col-lg-5 col-xl-5" width={600} height={600} alt="Illustration"/>
                    <div className="col-sm-12 col-md-12 col-lg-5 col-xl-5 offset-md-1 offset-lg-1 d-flex flex-column align-items-center">
                        <h1 className="fw-bold w-100 mb-5 text-center text-primary">Sign Up</h1>
                        <ProgressBar step={step} thirdStep={formData.signUpReason === "rhc"} />
                        <div className="w-auto">
                            {stepDisplay()}
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
                            <div className={`hover-button ${
                                submitShow ? "d-none" : ""
                            }`}>
                                <button className="btn btn-lg btn-secondary"
                                    disabled={step == 2} //This prevents the third component from being navigatible when not selected
                                    onClick={() => {
                                        setStep((currStep) => currStep - 1);
                                    }}
                                >
                                    Next
                                </button>
                            </div>
                            <div className={`hover-button ${
                                submitShow ? "" : "d-none"
                            }`}>
                                <button className="btn btn-lg btn-secondary"
                                    type="submit"
                                    onClick={() => {
                                        alert("DEBUG OUTPUT:\n" + JSON.stringify(formData));
                                        handleSignup(formData); //WHERE WE CONNECT TO SHEET.JS
                                    }}
                                >
                                    Sign up
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
                                    >
                                        login
                                    </button>
                                </div>
                            </div>
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


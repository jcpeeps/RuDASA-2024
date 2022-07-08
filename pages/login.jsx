import React from 'react'
import Layout from '../components/Layout'
import Image from 'next/image'
import Illustration from '../media/svg/login.svg'

export default function login() {
    return (
        <Layout pageTitle="RuDASA | Login">
            <section className="container">
                <div className="py-5 mb-5"></div>
                <div className="d-flex justify-content-center align-items-center mb-5 pb-5">
                    <Image src={Illustration} className="col-sm-12 col-md-12 col-lg-5 col-xl-5" width={600} height={600} />
                    <form className="col-sm-12 col-md-12 col-lg-5 col-xl-5 px-4 d-flex flex-column align-items-center ms-5">
                        <h1 className="fw-bold w-100 mb-5 text-center text-primary">Login</h1>
                        <div className="mt-3 w-100 ms-5">
                            <div>
                                <label for="email" className="text-primary fw-bold form-label ms-2">Email Address</label>
                                <input id="email" className="form-control border-0 border-bottom" type="email" placeholder="Email" />
                            </div>
                            <div className="mt-5">
                                <label for="password" className="text-primary fw-bold form-label ms-2">Password</label>
                                <input id="password" className="form-control border-0 border-bottom" type="password" placeholder="Password" />
                            </div>
                        </div>
                        <div className="w-100 my-4 d-flex justify-content-end align-items-center">
                            <small className="me-3">Don't have an account? <a href="/signUp">Sign up</a></small>
                            <input className="btn btn-secondary btn-lg" type="submit" value="Login" />
                        </div>
                    </form>
                </div>
            </section>
        </Layout>
    )
}

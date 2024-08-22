import React from 'react'
import Image from 'next/image'
import Logo from "/public/media/svg/logo.svg";
import Link from 'next/link'

export default function Hero() {

    return (
        <section className="container d-flex align-items-center justify-content-between main-container px-4 px-lg-0">
            <div className="row my-5 py-5">
                <div className="col-xs-12 col-sm-12 col-md-5 col-lg-5 col-xl-5 mt-5">
                    <Image src={Logo} alt="" />
                </div>
                
                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 offset-md-1 offset-lg-1 mt-5">
                    <h1 className="fw-bold mb-5 display-4">Inspiring others towards rural health</h1>
                    <div className="d-flex justify-content-center justify-content-lg-start">
                        <div className="gradient-outline me-3">
                            <Link href="/signUp">
                                <a role="button" className="btn btn-primary btn-lg gradient-background text-white fw-bold">Sign Up</a>
                            </Link>
                        </div>
                        <div className="gradient-outline">
                            <Link href="#who-are-we">
                                <a role="button" className="btn btn-outline-primary btn-lg fw-bold">Learn More</a>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

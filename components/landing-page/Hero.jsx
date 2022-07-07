import React from 'react'
import Image from 'next/image'
import Logo from '../../media/svg/logo.svg'

export default function Hero() {
    return (
        <section className="container h-100 d-flex align-items-center justify-content-between">
            <div className="row mb-5 pb-5">
                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                    <Image src={Logo} />
                </div>
                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                    <h1 className="display-3 fw-bold mb-5">Inspiring others towards rural health</h1>
                    <div className="d-flex">
                        <div className="gradient-outline me-3">
                            <a href="/sign-up" role="button" className="btn btn-primary btn-lg gradient-background text-white fw-bold">Sign Up</a>
                        </div>
                        <div className="gradient-outline">
                            <a href="#" role="button" className="btn btn-outline-primary btn-lg fw-bold">Learn More</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

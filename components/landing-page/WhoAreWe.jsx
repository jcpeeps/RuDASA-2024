import React from 'react'
import Image from 'next/image'
import Illustration1 from '../../media/svg/who-are-we.svg'

export default function WhoAreWe({ content }) {
    return (
        <section className="bg-light px-3" id="who-are-we">
            <div className="container py-2 py-lg-5">
                <div className="row my-5 py-2 py-lg-5">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
                        <h1 className="display-4 fw-bold mb-5">Who are we?</h1>
                        <p>{content.about}</p>
                        <div>
                            <h4 className="text-primary fw-bold">Our Vision</h4>
                            <p>{content.vision}</p>
                            <h4 className="text-primary fw-bold">Our Mission</h4>
                            <p>{content.mission}</p>
                        </div>
                        <div className="w-100 text-end hover-button">
                            <a href="/about" role="button" className="btn btn-lg btn-primary gradient-background text-white mt-4">Meet our team</a>
                        </div>
                    </div>
                    <div className="col-lg-6 col-xl-6 text-center d-none d-lg-block">
                        <Image src={Illustration1} />
                    </div>
                </div>
            </div>
        </section>
    )
}



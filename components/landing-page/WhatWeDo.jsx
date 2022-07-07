import React from 'react'
import Image from 'next/image'
import Illustration2 from '../../media/svg/what-we-do.svg'

export default function WhatWeDo() {
    return (
        <section>
            <div className="container py-5">
                <div className="row my-5 py-5">
                    <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 text-center">
                        <Image src={Illustration2} />
                    </div>
                    <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                        <h1 className="display-4 fw-bold mb-5">What do we do?</h1>
                        <div>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia quod dolor modi provident odio rem! Dolorum quidem illo voluptas fuga impedit, cumque repudiandae sunt autem libero perspiciatis iusto corrupti nisi nobis maiores eaque nulla adipisci voluptatibus mollitia eos ipsam quaerat, ipsa aliquam? Perspiciatis est, doloribus vitae ea nihil aspernatur illo sint aliquid quaerat odio minima esse, atque excepturi reprehenderit! Sit.</p>
                        </div>
                        <div>
                            <a href="/about" role="button" className="btn btn-lg btn-primary gradient-background text-white mt-4">Become a member</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

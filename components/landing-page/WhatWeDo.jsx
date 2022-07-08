import React from 'react'
import Image from 'next/image'
import Illustration2 from '../../media/svg/what-we-do.svg'
import { marked } from 'marked'

export default function WhatWeDo({ content }) {
    return (
        <section>
            <div className="container py-5">
                <div className="row my-5 py-5">
                    <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 text-center">
                        <Image src={Illustration2} />
                    </div>
                    <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                        <h1 className="display-4 fw-bold mb-5">What do we do?</h1>
                        <div dangerouslySetInnerHTML={{__html: marked(content)}}/>
                        <div>
                            <a href="/about" role="button" className="btn btn-lg btn-primary gradient-background text-white mt-4">Become a member</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

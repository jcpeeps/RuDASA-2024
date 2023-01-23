import React from 'react'
import Image from 'next/image'
import Illustration2 from '../../media/svg/what-we-do.svg'
import { marked } from 'marked'
import Link from 'next/link'

export default function WhatWeDo({ content }) {

    return (
        <section className="px-3">
            <div className="container py-2 py-lg-5">
                <div className="row my-5 py-2 py-lg-5">
                    <div className="col-lg-6 col-xl-6 text-center d-none d-lg-block">
                        <Image src={Illustration2} alt="" />
                    </div>
                    
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
                        <h1 className="display-4 fw-bold mb-5">What do we do?</h1>
                        <div dangerouslySetInnerHTML={{__html: marked(content)}}/>
                        <div className="hover-button">
                            <Link href="/signUp">
                                <a role="button" className="btn btn-lg btn-primary gradient-background text-white mt-4">Become a member</a>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

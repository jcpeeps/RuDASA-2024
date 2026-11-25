import React from 'react'
import Image from 'next/image'
import Illustration2 from "/public/media/svg/what-we-do.svg";
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
                        <div className="what-we-do-content" dangerouslySetInnerHTML={{__html: marked(content)}}/>
                        <div className="hover-button">
                            <Link href="/signUp">
                                <a role="button" className="btn btn-lg btn-primary gradient-background text-white mt-4">Become a member</a>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Donate buttons: on phones each amount stacks above its button instead of running off the screen */}
            <style jsx global>{`
                .what-we-do-content img {
                    max-width: 100%;
                    height: auto;
                }
                @media (max-width: 767.98px) {
                    .what-we-do-content table {
                        display: grid;
                        grid-template-columns: 1fr;
                        width: 100%;
                    }
                    .what-we-do-content thead,
                    .what-we-do-content tbody,
                    .what-we-do-content tr {
                        display: contents;
                    }
                    .what-we-do-content th,
                    .what-we-do-content td {
                        display: block;
                        text-align: center;
                        border: 0;
                        padding: 0.25rem 0;
                    }
                    .what-we-do-content td {
                        margin-bottom: 1.25rem;
                    }
                    .what-we-do-content th:nth-child(1) { order: 1; }
                    .what-we-do-content td:nth-child(1) { order: 2; }
                    .what-we-do-content th:nth-child(2) { order: 3; }
                    .what-we-do-content td:nth-child(2) { order: 4; }
                    .what-we-do-content th:nth-child(3) { order: 5; }
                    .what-we-do-content td:nth-child(3) { order: 6; }
                }
            `}</style>
        </section>
    )
}

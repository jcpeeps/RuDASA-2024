import React from 'react'
import { marked } from 'marked'

export default function Hero ({ content }) {
    return (
        <section>
            <div className="py-5 mb-5"></div>
            <div className="container px-4 px-lg-0">
                <h1 className="display-6 fw-bold text-primary mb-5">Resources</h1>
                <div className="row">
                    <div className="col-12 mb-4 w-100">
                        <div dangerouslySetInnerHTML={{__html: marked(content.content)}}/>
                    </div>
                </div>
            </div>
        </section>
    )
}
import React from 'react'
import { marked } from 'marked'
import Link from 'next/link'

export default function Advocacy({ content, examples }) {
    return (
        <section className="bg-primary w-100">
            <div className="container py-2 py-lg-5">
                <h1 className="text-white display-3 mt-5">Advocacy Work</h1>
                <div className="d-flex justify-content-between align-items-start my-3 pe-lg-3 flex-column flex-lg-row my-md-5 pe-md-5">
                    <div className="bg-white rounded shadow advocacy-container p-4 my-3 m-md-3 p-md-5">
                        <div dangerouslySetInnerHTML={{__html: marked(content)}}/>
                    </div>
                    <div className="advocacy-examples">
                        <div className="bg-white rounded shadow p-4 my-3 m-md-3 p-md-5 styled-bullets">
                            <div dangerouslySetInnerHTML={{__html: marked(examples)}}/>
                        </div>
                        <div className="w-100 hover-button text-end">
                            <Link href="/resources#events" role="button" className="btn btn-lg btn-secondary text-white mt-4">View events</Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

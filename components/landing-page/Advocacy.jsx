import React from 'react'
import { marked } from 'marked'

export default function Advocacy({ content, examples }) {
    return (
        <section className="bg-primary w-100">
            <div className="container py-5">
                <h1 className="text-white display-3 mt-5">Advocacy Work</h1>
                <div className="d-flex justify-content-between align-items-start my-3 pe-3 flex-column flex-lg-row my-md-5 pe-md-5">
                    <div className="bg-white rounded shadow advocacy-container p-4 m-3 p-md-5">
                        <div dangerouslySetInnerHTML={{__html: marked(content)}}/>
                    </div>
                    <div className="advocacy-examples">
                        <div className="bg-white rounded shadow p-4 m-3 p-md-5 styled-bullets">
                            <div dangerouslySetInnerHTML={{__html: marked(examples)}}/>
                        </div>
                        <div className="w-100 text-end">
                            <a href="/resources#events" role="button" className="btn btn-lg btn-secondary text-white mt-4">View events</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

import React from 'react'
import { marked } from 'marked'

export default function SnT({ content }) {
    return (
        <div className="d-flex flex-column my-5">
            <h4 className="w-100 fw-bold display-6 text-primary">Rural Health Conference</h4>
            <div className="my-3">
                <div className="bg-white justify-content-around rounded shadow d-flex flex-wrap p-4 p-md-5">
                    <div dangerouslySetInnerHTML={{ __html: marked(content.content) }} className="column-wrap" />
                </div>
                <div className="hover-button text-end w-100">
                    <a href="#" className="btn btn-secondary mt-3">Visit RHC Site</a>
                </div>
            </div>
        </div>
    )
}
import React from 'react'
import { marked } from 'marked'

export default function SaWork({ content }) {
  return (
    <section>
            <div className="container py-3 py-lg-5 px-4 px-md-0 mb-5">
                <h1 className="fw-bold my-5">Working in South Africa</h1>
                <article>
                    <div dangerouslySetInnerHTML={{__html: marked(content)}}/>
                </article>
            </div>
        </section>
  )
}

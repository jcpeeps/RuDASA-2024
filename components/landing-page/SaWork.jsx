import React from 'react'
import { marked } from 'marked'

export default function SaWork({ content }) {
  return (
    <section>
            <div className="container py-5 mb-5">
                <h1 className="fw-bold my-5">Working in South Africa</h1>
                <article>
                    <div dangerouslySetInnerHTML={{__html: marked(content)}}/>
                </article>
            </div>
        </section>
  )
}

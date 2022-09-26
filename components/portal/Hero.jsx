import React from 'react'
import { marked } from 'marked'

export default function ResourceGroups({overview}) {
  return (
    <section className="bg-light">
        <div className="container bg-light mt-5 p-4 p-lg-5">
            <h4 className="fw-bold">Overview</h4>
            <div dangerouslySetInnerHTML={{__html: marked(overview)}}/>
        </div>
    </section>
  )
}

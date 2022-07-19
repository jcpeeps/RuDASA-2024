import React from 'react'
import { marked } from 'marked'

export default function Benefits({ content: {frontmatter, sections} }) {
    return (
        <div className="bg-light">
            <div className="container p-5 d-flex flex-column flex-lg-row justify-content-between w-100">
                <div className="me-lg-5 mb-4 mb-lg-0">
                    <h3>What our membership offers</h3>
                    <p>{frontmatter.offer}</p>
                </div>
                <div className="benefits-class">
                    <h3>Benefits</h3>
                    <div className="styled-bullets">
                        <div dangerouslySetInnerHTML={{
                            __html: marked(
                                sections[sections.findIndex((e) => e.key === "benefits")].data
                            )
                        }} />
                    </div>
                </div>
            </div>
        </div>
    )
}

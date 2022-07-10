import React from 'react'
import { marked } from 'marked'

export default function Onboarding({ content: { frontmatter, sections } }) {
    console.log(sections)
    return (
        <div className="d-flex flex-column my-5">
            <h4 className="w-100 fw-bold display-6 text-primary">Rural Health On-Boarding Programme</h4>
            <h5 className="w-100 fw-bold">{frontmatter.date}</h5>
            <div className="d-flex flex-wrap col-12 col-lg-12 my-5">
                <h5 className="fw-bold">{frontmatter.abstractTitle}</h5>
                <p>{frontmatter.abstract}</p>
                <div className="d-flex flex-wrap flex-lg-nowrap justify-content-between align-items-start my-5">
                    <div className="d-flex flex-column col-12 col-lg-6">
                        <h5 className="fw-bold">Course Structure</h5>
                        <div dangerouslySetInnerHTML={{
                            __html: marked(
                                sections[sections.findIndex((e) => e.key === "structure")].data
                            )
                        }} />
                    </div>
                    <div className="bg-white rounded shadow d-flex p-5 col-12 col-lg-5">
                        <p>You can join anytime during the 6 weeks course running from {frontmatter.date}. <strong>The webinars are limited to 100 participants.</strong> All interactive Zoom sessions will be recorded and will be made available online and we will send you links to all the material you may have missed.</p>
                    </div>
                </div>
                <div className="d-flex flex-wrap flex-lg-nowrap align-items-start justify-content-between my-5">
                    <div className="d-flex flex-column col-12 col-lg-6">
                        <h5 className="fw-bold">Curriculum Overview</h5>
                        <div className="styled-numbers" dangerouslySetInnerHTML={{
                            __html: marked(
                                sections[sections.findIndex((e) => e.key === "overview")].data
                            )
                        }} />
                    </div>
                    <div className="bg-white rounded shadow d-flex p-5 col-12 col-lg-5">
                        <div className="week-list" dangerouslySetInnerHTML={{
                            __html: marked(
                                sections[sections.findIndex((e) => e.key === "weeks")].data
                            )
                        }} />
                    </div>
                </div>
                <div className="d-flex flex-wrap flex-lg-nowrap justify-content-between my-5">
                    <div className="d-flex flex-column col-12">
                        <h5 className="fw-bold">Who can attend?</h5>
                        <div dangerouslySetInnerHTML={{
                            __html: marked(
                                sections[sections.findIndex((e) => e.key === "attendance")].data
                            )
                        }} />
                    </div>
                </div>
                <div className="d-flex flex-wrap flex-lg-nowrap justify-content-between align-items-start my-5">
                    <div className="d-flex flex-column col-12 col-lg-6">
                        <h5 className="fw-bold text-primary mb-3">How to get Started:</h5>
                        <div dangerouslySetInnerHTML={{
                            __html: marked(
                                sections[sections.findIndex((e) => e.key === "getStarted")].data
                            )
                        }} />
                    </div>
                    <div className="bg-white rounded shadow d-flex flex-column p-5 col-12 col-lg-5">
                        <div dangerouslySetInnerHTML={{
                            __html: marked(
                                sections[sections.findIndex((e) => e.key === "orgs")].data
                            )
                        }} />
                    </div>
                </div>
            </div>
        </div>
    )
}
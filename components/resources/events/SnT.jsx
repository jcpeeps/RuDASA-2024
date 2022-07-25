import React from 'react'
import Image from 'next/image'
import Illustration4 from '../../../media/svg/snt-students.svg'
import { marked } from 'marked'

export default function SnT ({ snt, snts }) {
    return (
        <div className="d-flex flex-column">
            <h4 className="w-100 fw-bold px-3 px-lg-0">Survive and Thrive</h4>
            <div className="d-flex flex-wrap my-3 mb-5 pb-5">
                <div className="d-flex flex-wrap flex-lg-nowrap">
                    <div className="bg-white rounded shadow p-4 p-md-5 m-2 col-12 col-lg-7">{snt.frontmatter.firstPoint}</div>
                    <div className="bg-white rounded shadow p-4 p-md-5 m-2 col-12 col-lg-5 styled-bullets" dangerouslySetInnerHTML={{__html: marked(snt.content)}}/>
                </div>
                <div className="d-flex flex-wrap flex-lg-nowrap">
                    <div className="bg-white rounded shadow p-4 p-md-5 m-2 col-12 col-lg-5">{snt.frontmatter.secondPoint}</div>
                    <div className="bg-white rounded shadow p-4 p-md-5 m-2 col-12 col-lg-7">{snt.frontmatter.thirdPoint}</div>
                </div>
            </div>
            <h4 className="w-100 fw-bold">Survive and Thrive Students</h4>
            <div className="d-flex align-items-center justify-content-between my-3">
                <div className="d-flex flex-column col-12 col-lg-7">
                    <div className="bg-white rounded shadow p-4 p-md-5 mb-2 w-100">{snts.frontmatter.firstPoint}</div>
                    <div className="bg-white rounded shadow p-4 p-md-5 mt-2 w-100">{snts.frontmatter.secondPoint}</div>
                </div>
                <Image src={Illustration4} className="col-12 col-lg-5" width={400} alt="" />
            </div>
        </div>
    )
}
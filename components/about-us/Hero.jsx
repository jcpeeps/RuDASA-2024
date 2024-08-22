import React from 'react'
import Image from 'next/image'
import TeamSvg from "/public/media/svg/team.svg";
import { marked } from 'marked'

export default function Hero({ content }) {
    
    return (
        <section className="meet-team-height">
            <div className="py-4 py-lg-5 mb-5"></div>
            <div className="container-lg px-4 px-lg-0">
                <h1 className="dispaly-4 fw-bold text-primary mb-5">About Us</h1>
                <h4 className="fw-bold mb-4">{content.frontmatter.title}</h4>
                <div dangerouslySetInnerHTML={{__html: marked(content.content)}} className="column-wrap mb-5 pb-5"/>
                <div className="position-absolute team-svg d-none d-lg-block">
                    <Image src={TeamSvg} width={700} alt="" />
                </div>
            </div>
        </section>
    )
}

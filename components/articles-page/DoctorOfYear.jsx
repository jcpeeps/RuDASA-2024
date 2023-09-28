import React, { useState } from 'react'
import Image from 'next/image'
import Portrait from '../../media/doctor-of-the-year/Dr Bukiwe Spondo 2023.jpeg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouseMedical, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { marked } from 'marked'
import { Accordion } from 'react-bootstrap'

export default function DoctorOfYear({ markdown: { frontmatter, content }, prevRecipients }) {
    const [readMore, setReadMore] = useState(false)

    return (
        <section className="container mb-2 mb-lg-5 p-4 p-lg-5">
            <h1 className="dispaly-4 fw-bold text-primary my-5 pt-5">Articles</h1>
            <h3 className="my-4 pb-4 fw-bold">Rural Doctor of the Year {frontmatter.year}</h3>
            <div className="row">
                <div className="col-sm-12 col-md-12 col-lg-6 d-flex flex-wrap flex-md-nowrap align-items-start">
                    <Image src={Portrait} width={270} height={270} className="rounded-circle image-crop" alt="" />
                    <div className="ms-0 ms-md-5 my-3">
                        <h5 className="fw-bold mb-3">Dr {frontmatter.name}</h5>
                        <div className="d-flex mb-2">
                            <FontAwesomeIcon icon={faHouseMedical} className="text-primary me-2" />
                            <p className="m-0">{frontmatter.hospital}</p>
                        </div>
                        <div className="d-flex">
                            <FontAwesomeIcon icon={faLocationDot} className="text-primary me-2" />
                            <p className="m-0">{frontmatter.location}</p>
                        </div>
                    </div>
                </div>
                <div className="col-sm-12 col-md-12 col-lg-6 mt-md-3">
                    <div dangerouslySetInnerHTML={{
                        __html: marked(
                            readMore ? content : content.substring(0, 500) + '...'
                        )
                    }} />

                    <span onClick={() => setReadMore(!readMore)} className="mt-4 pointer" style={{cursor: 'pointer'}}>{readMore ? 'Read less' : 'Read more'}</span>
                </div>
  <section className="container mb-2 mb-lg-5 p-4 p-lg-5">
            <h1 className="dispaly-4 fw-bold text-primary my-5 pt-5">Articles</h1>
            <h3 className="my-4 pb-4 fw-bold">Rural Doctor of the Year {frontmatter.year}</h3>
            <div className="row">
                <div className="col-sm-12 col-md-12 col-lg-6 d-flex flex-wrap flex-md-nowrap align-items-start">
                    <Image src={Portrait} width={270} height={270} className="rounded-circle image-crop" alt="" />
                    <div className="ms-0 ms-md-5 my-3">
                        <h5 className="fw-bold mb-3">Dr {frontmatter.name}</h5>
                        <div className="d-flex mb-2">
                            <FontAwesomeIcon icon={faHouseMedical} className="text-primary me-2" />
                            <p className="m-0">{frontmatter.hospital}</p>
                        </div>
                        <div className="d-flex">
                            <FontAwesomeIcon icon={faLocationDot} className="text-primary me-2" />
                            <p className="m-0">{frontmatter.location}</p>
                        </div>
                    </div>
        
                
            </div>
            <div className="d-flex flex-column-reverse flex-md-row w-100 justify-content-between align-items-start my-5">
                <Accordion className="border-bottom flex-fill" flush>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>View previous recipients</Accordion.Header>
                        <Accordion.Body>
                            <div dangerouslySetInnerHTML={{ __html: marked(prevRecipients.content) }} />
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
                <div className="text-end hover-button mb-4 mb-md-0 flex-fill">
                    <a href="https://forms.gle/8pvSMjo1HTw2eqKd9" target="_blank" rel="noreferrer" role="button" className="btn btn-lg btn-secondary text-white">Nominate a Doctor</a>
                </div>
            </div>
        </section>
    )
}

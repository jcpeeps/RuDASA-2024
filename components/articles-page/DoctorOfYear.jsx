import React from 'react'
import Image from 'next/image'
import Portrait from '../../media/doctor-of-the-year/portrait.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouseMedical, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { marked } from 'marked'

export default function DoctorOfYear({ markdown: { frontmatter, content }, prevRecipients }) {

    return (
        <section className="container mb-5 p-5">
            <h1 className="dispaly-4 fw-bold text-primary my-5">Articles</h1>
            <h3 className="my-4 pb-4 fw-bold">Rural Doctor of the Year {frontmatter.year}</h3>
            <div className="row">
                <div className="col-sm-12 col-md-5 col-lg-5 d-flex flex-wrap flex-md-nowrap">
                    <Image src={Portrait} width={270} height={270} className="rounded-circle" />
                    <div className="ms-5 my-3">
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
                <div className="col-sm-12 col-md-6 col-lg-6 mt-md-3">
                    <div dangerouslySetInnerHTML={{ __html: marked(content) }} />
                </div>
            </div>
            <div className="flex">
                {/* <div className="accordion accordion-flush w-50" id="recipients">
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="headingOne">
                            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                View previous recipients
                            </button>
                        </h2>
                        <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#recipients">
                            <div class="accordion-body">
                                <strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                            </div>
                        </div>
                    </div>
                </div> */}
                <div className="text-end">
                    <a href="#" role="button" className="btn btn-lg btn-secondary text-white mt-4">Nominate a Doctor</a>
                </div>
            </div>
        </section>
    )
}

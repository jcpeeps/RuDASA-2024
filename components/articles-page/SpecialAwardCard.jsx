import { faCalendarAlt, faClock } from '@fortawesome/free-regular-svg-icons';
import { faHouseMedical, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { marked } from 'marked';
import Image from 'next/image';
import React, { useState } from 'react';

export default function SpecialAwardCard(props) {
    const [readMore, setReadMore] = useState(false)
    return (
        <section className="mb-2 mb-lg-5 p-4 p-lg-5 bg-white shadow rounded-3">
            <h5 className="fw-bold mb-3">{props.name}</h5>

            <div className="row">
                <div className="col-sm-12 col-md-12 col-lg-5 d-flex flex-wrap flex-md-nowrap align-items-start">
                    <div className="ms-0 ms-md-2 my-3">
                    { props.image && <Image src={props.image} width={270} height={270} className="image-crop" alt="" />}
                        { props.hospital && <div className="d-flex align-items-center">
                            <FontAwesomeIcon icon={faHouseMedical} className="text-primary me-2" /><p className="m-0">{props.hospital}</p> 
                        </div> }
                        { props.location && <div className="d-flex align-items-center">
                            <FontAwesomeIcon icon={faLocationDot} className="text-primary me-2" />
                            <p className="m-0">{props.location}</p>
                        </div> }
                        <div className="d-flex align-items-center">
                            <FontAwesomeIcon icon={faCalendarAlt} className="text-primary me-2" />
                            <p className="m-0">{props.year}</p>
                        </div>
                    </div>
                </div>
                <div className="col-sm-12 col-md-12 col-lg-7 mt-md-3">
                    <div dangerouslySetInnerHTML={{
                        __html: marked(
                            readMore ? props.content : props.content?.substring(0, 500) + '...'
                        )
                    }} />
                    <span onClick={() => setReadMore(!readMore)} className="mt-4 pointer" style={{cursor: 'pointer'}}>{readMore ? 'Read less' : 'Read more'}</span>
                </div>
            </div>
                <div className="d-flex align-items-center">
                    <FontAwesomeIcon icon={faClock} className="me-2 text-muted" />
                    <p className="text-muted m-0">{props.date}</p>
                </div>
        </section>
    )
}

import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock, faCalendarAlt  } from '@fortawesome/free-regular-svg-icons'
import { faHouseMedical, faLocationDot } from '@fortawesome/free-solid-svg-icons';

export default function SpecialAwardCard(props) {
    return (
        <div className="bg-white shadow rounded-3 p-5 m-2 m-lg-3">
            <h5 className="fw-bold mb-3">{props.name}</h5>
            <FontAwesomeIcon icon={faCalendarAlt} className="text-primary me-2" />
            <small className="text-muted mb-3">{props.year}</small><br/>
            <FontAwesomeIcon icon={faHouseMedical} className="text-primary me-2" />
            <small className="text-muted mb-4">{props.hospital}</small><br/>
            <FontAwesomeIcon icon={faLocationDot} className="text-primary me-2" />
            <small className="text-muted mb-4">{props.location}</small><br/>
            <p>{props.content}</p>
            <div className="d-flex justify-content-between align-items-end">
                {/* <div className="hover-button">
                    <a href={props.link} target="_blank" role="button" className="btn btn-primary text-white mt-4">Read</a>
                </div> */}
                {/* <div className="d-flex align-items-center">
                    <FontAwesomeIcon icon={faClock} className="me-2 text-muted" />
                    <p className="text-muted m-0">{props.date}</p>
                </div> */}
            </div>
        </div>
    )
}

import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock } from '@fortawesome/free-regular-svg-icons'

export default function StatementCard(props) {
    return (
        <div className="bg-white shadow rounded-3 p-5 m-2 m-lg-3 partner-width">
            <h5 className="fw-bold mb-3">{props.title}</h5>
            <small className="text-muted mb-4">by {props.author}</small>
            <p>{props.description}</p>
            <div className="d-flex justify-content-between align-items-end">
                {/* <div className="hover-button">
                    <a href={props.link} target="_blank" role="button" className="btn btn-primary text-white mt-4">Read</a>
                </div> */}
                <div className="d-flex align-items-center">
                    <FontAwesomeIcon icon={faClock} className="me-2 text-muted" />
                    <p className="text-muted m-0">{props.date}</p>
                </div>
            </div>
        </div>
    )
}

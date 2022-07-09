import React from 'react'

export default function PartnerCard(props) {
    return (
        <div className="bg-white shadow rounded-3 p-5 m-4 partner-width">
            <h5 className="fw-bold mb-3">{props.title}</h5>
            <p>{props.description}</p>
            <div className="text-end">
                <div className="hover-button">
                    <a href={props.link} role="button" className="btn btn-primary text-white mt-4">Learn more</a>
                </div>
            </div>
        </div>
    )
}

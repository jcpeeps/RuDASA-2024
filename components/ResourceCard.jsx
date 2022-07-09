import React from 'react'
import Image from 'next/image'

export default function ResourceCard(props) {
  return (
    <div className="resc-card-width bg-white shadow rounded p-4 m-3 d-flex flex-column align-items-center justify-content-center">
        <a href={props.link} className="text-black text-decoration-none">
            <p className="fw-bold text-center">{props.title}</p>
            <div className="d-flex justify-content-center">
              <img src={props.icon} />
            </div> 
        </a>
    </div>
  )
}

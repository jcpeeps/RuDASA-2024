import React from 'react'
import SnT from '../resources/events/SnT'

export default function Events () {
    return (
        <section className="container">
            <div className="bg-light p-5 my-5">
                <h1 className="display-6 fw-bold text-primary mb-3">Events</h1>
                <SnT/>  
            </div>
            <div className="p-5 my-5"></div>
            <div className="bg-light p-5 mt-5 mb-0"></div>
        </section>
    )
}
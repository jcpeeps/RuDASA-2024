import React from 'react'
import SnT from '../resources/events/SnT'
import RHC from '../resources/events/RHC'
import Onboarding from '../resources/events/Onboarding'

export default function Events({ snt, snts, onboarding, rhc }) {
    return (
        <>
            <section className="bg-light" id="events">
                <div className="container my-5 py-5">
                    <h1 className="display-5 fw-bold text-primary mb-3 px-3 p-lg-0">Events</h1>
                    <SnT snt={snt} snts={snts} />
                </div>
            </section>
            <section className="bg-white">
                <div className="container my-3 p-3">
                    <Onboarding content={onboarding} />
                </div>
            </section>
            <section className="bg-light">
                <div className="container my-3 p-3">
                    <RHC content={rhc} />
                </div>
            </section>
        </>
    )
}
import React from 'react'
import ResourceCard from '../ResourceCard'
import Icon from '../../media/icons/icon-01.svg'

export default function ResourceGroups() {
  return (
    <section className="container">
        <div>
            <div className="py-5 mb-5"></div>
            <h4 className="fw-bold display-6 text-primary mt-5">Learning Portal</h4>
            <div className="col-12 col-lg-10 d-flex flex-wrap p-4">
                <ResourceCard icon={Icon} title="General &amp; Health Systems"/>
                <ResourceCard icon={Icon} title="Emergency Medecine"/>
                <ResourceCard icon={Icon} title="Surgery"/>
                <ResourceCard icon={Icon} title="Maternal Health &amp; Pediatrics"/>
                <ResourceCard icon={Icon} title="Orthopaedics"/>
                <ResourceCard icon={Icon} title="NCDs"/>
                <ResourceCard icon={Icon} title="Tuberculosis"/>
                <ResourceCard icon={Icon} title="HIV"/>
                <ResourceCard icon={Icon} title="COVID-19"/>
                <ResourceCard icon={Icon} title="Mental Health"/>
            </div>
        </div>
    </section>
  )
}

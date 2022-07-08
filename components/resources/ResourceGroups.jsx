import React from 'react'
import ResourceCard from '../resources/ResourceCard'
import Icon from '../../media/icons/icon-01.svg'

export default function ResourceGroups() {
  return (
    <div className="container my-5">
        <h3 className="fw-bold">Students &amp; Young Doctors</h3>
        <div className="col-12 col-lg-8 d-flex flex-wrap p-4">
            <ResourceCard icon={Icon} title="Student Electives"/>
            <ResourceCard icon={Icon} title="Scholarships"/>
            <ResourceCard icon={Icon} title="Student Rural Health Clubs"/>
            <ResourceCard icon={Icon} title="Helplines"/>
        </div>
        <h3 className="fw-bold">Rural Resources</h3>
        <div className="col-12 col-lg-8  d-flex flex-wrap p-4">
            <ResourceCard icon={Icon} title="Rural Mental Health"/>
            <ResourceCard icon={Icon} title="Rural Policy &amp; HR"/>
            <ResourceCard icon={Icon} title="Rural Contacts"/>
            <ResourceCard icon={Icon} title="Community Engagement"/>
        </div>
        <h3 className="fw-bold">Other Resources</h3>
        <div className="col-12 col-lg-8  d-flex flex-wrap p-4">
            <ResourceCard icon={Icon} title="Labour Relations"/>
            <ResourceCard icon={Icon} title="Acts &amp; Policies"/>
            <ResourceCard icon={Icon} title="Systems &amp; Advocacy"/>
            <ResourceCard icon={Icon} title="Telemedecine"/>
            <ResourceCard icon={Icon} title="COVID-19"/>
            <ResourceCard icon={Icon} title="PHC &amp; Guidelines"/>
            <ResourceCard icon={Icon} title="Research &amp; Quick Links"/>
            <ResourceCard icon={Icon} title="Courses"/>
        </div>
    </div>
  )
}

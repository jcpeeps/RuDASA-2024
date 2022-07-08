import React from 'react'
import ResourceCard from '../resources/ResourceCard'

export default function ResourceGroups() {
  return (
    <div className="container my-5">
        <h3 className="fw-bold">Students &amp; Young Doctors</h3>
        <div className="col-12 col-lg-8 d-flex flex-wrap p-4">
            <ResourceCard icon="" title="Student Electives"/>
            <ResourceCard icon="" title="Scholarships"/>
            <ResourceCard icon="" title="Student Rural Health Clubs"/>
            <ResourceCard icon="" title="Helplines"/>
        </div>
        <h3 className="fw-bold">Rural Resources</h3>
        <div className="col-12 col-lg-8  d-flex flex-wrap p-4">
            <ResourceCard icon="" title="Rural Mental Health"/>
            <ResourceCard icon="" title="Rural Policy &amp; HR"/>
            <ResourceCard icon="" title="Rural Contacts"/>
            <ResourceCard icon="" title="Community Engagement"/>
        </div>
        <h3 className="fw-bold">Other Resources</h3>
        <div className="col-12 col-lg-8  d-flex flex-wrap p-4">
            <ResourceCard icon="" title="Labour Relations"/>
            <ResourceCard icon="" title="Acts &amp; Policies"/>
            <ResourceCard icon="" title="Systems &amp; Advocacy"/>
            <ResourceCard icon="" title="Telemedecine"/>
            <ResourceCard icon="" title="COVID-19"/>
            <ResourceCard icon="" title="PHC &amp; Guidelines"/>
            <ResourceCard icon="" title="Research &amp; Quick Links"/>
            <ResourceCard icon="" title="Courses"/>
        </div>
    </div>
  )
}

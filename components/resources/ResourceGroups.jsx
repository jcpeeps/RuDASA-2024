import React from 'react'
import ResourceCard from '../ResourceCard'

export default function ResourceGroups({ student, rural, other }) {

	return (
		<div className="container my-5 px-3 px-lg-0">
			<h3 className="fw-bold mb-4 mb-md-0">Students &amp; Young Doctors</h3>
			<div className="d-flex flex-wrap p-1 p-md-3">
				{student.map((card, index) => (
					<ResourceCard icon={`/icons/${card.slug}.svg`} title={card.frontmatter.title} link={`/resources/students/${card.slug}`} key={index} />
				))}
			</div>
			<h3 className="fw-bold">Rural Resources</h3>
			<div className="d-flex flex-wrap p-1 p-md-3">
				{rural.map((card, index) => (
					<ResourceCard icon={`/icons/${card.slug}.svg`} title={card.frontmatter.title} link={`/resources/rural/${card.slug}`} key={index} />
				))}
			</div>
			<h3 className="fw-bold">Other Resources</h3>
			<div className="d-flex flex-wrap p-1 p-md-3">
				{other.map((card, index) => (
					<ResourceCard icon={`/icons/${card.slug}.svg`} title={card.frontmatter.title} link={`/resources/other/${card.slug}`} key={index} />
				))}
			</div>
		</div>
	)
}

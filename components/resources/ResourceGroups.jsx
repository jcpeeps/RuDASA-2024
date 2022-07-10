import React from 'react'
import ResourceCard from '../ResourceCard'

export default function ResourceGroups({ student, rural, other }) {

	return (
		<div className="container my-5">
			<h3 className="fw-bold">Students &amp; Young Doctors</h3>
			<div className="col-12 col-lg-8 d-flex flex-wrap p-4">
				{student.map((card, index) => (
					<ResourceCard icon={`/icons/${card.slug}.svg`} title={card.frontmatter.title} link={`/resources/students/${card.slug}`} key={index} />
				))}
			</div>
			<h3 className="fw-bold">Rural Resources</h3>
			<div className="col-12 col-lg-8  d-flex flex-wrap p-4">
				{rural.map((card, index) => (
					<ResourceCard icon={`/icons/${card.slug}.svg`} title={card.frontmatter.title} link={`/resources/rural/${card.slug}`} key={index} />
				))}
			</div>
			<h3 className="fw-bold">Other Resources</h3>
			<div className="col-12 col-lg-8  d-flex flex-wrap p-4">
				{other.map((card, index) => (
					<ResourceCard icon={`/icons/${card.slug}.svg`} title={card.frontmatter.title} link={`/resources/other/${card.slug}`} key={index} />
				))}
			</div>
		</div>
	)
}

import React from 'react'
import ResourceCard from '../ResourceCard'

export default function ResourceGroups({ thrive, activities, student, rural, other }) {

	return (
		<div className="container my-5 px-3 px-lg-0">
			<h3 className="fw-bold mb-4 mb-md-0">Thrive, Not Just Survive in Rural Care</h3>
			<div className="d-flex flex-wrap p-1 p-md-3">
				{thrive.map((card, index) => (
					<ResourceCard icon={`/icons/${card.slug}.svg`} title={card.frontmatter.title} link={`/resources/thrive/${card.slug}`} key={index} />
				))}
			</div>
			<h3 className="fw-bold mb-4 mb-md-0">Key RuDASA Activities</h3>
			<div className="d-flex flex-wrap p-1 p-md-3">
				{activities.map((card, index) => (
					<ResourceCard icon={`/icons/${card.slug}.svg`} title={card.frontmatter.title} link={`/resources/activities/${card.slug}`} key={index} />
				))}
			</div>
			<h3 className="fw-bold">Rural Partners</h3>
			<div className="d-flex flex-wrap p-1 p-md-3">
				{rural.map((card, index) => (
					<ResourceCard icon={`/icons/${card.slug}.svg`} title={card.frontmatter.title} link={`/resources/rural/${card.slug}`} key={index} />
				))}
			</div>

			<h3 className="fw-bold">Resources</h3>
			<div className="d-flex flex-wrap p-1 p-md-3">
				{other.map((card, index) => (
					<ResourceCard icon={`/icons/${card.slug}.svg`} title={card.frontmatter.title} link={`/resources/other/${card.slug}`} key={index} />
				))}
			</div>
			<h3 className="fw-bold mb-4 mb-md-0">Students</h3>
			<div className="d-flex flex-wrap p-1 p-md-3">
				{student.map((card, index) => (
					<ResourceCard icon={`/icons/${card.slug}.svg`} title={card.frontmatter.title} link={`/resources/students/${card.slug}`} key={index} />
				))}
			</div>
		</div>
	)
}

import React from 'react'
import ResourceCard from '../ResourceCard'

export default function ResourceGroups({ resources }) {
	return (
		<section className="container">
			<div>
				<div className="py-5 mb-5"></div>
				<h4 className="fw-bold display-6 text-primary mt-5">Learning Portal</h4>
				<div className="d-flex flex-wrap p-1 p-md-4">
					{resources.map((card, index) => (
						<ResourceCard icon={`/icons/${card.slug}.svg`} title={card.frontmatter.title} link={`/resources/portal/${card.slug}`} key={index} />
					))}
				</div>
			</div>
		</section>
	)
}

import React from 'react'
import ResourceCard from '../ResourceCard'

export default function ResourceGroups({ resources }) {
	
	return (
		<section>
			<div>
				<div className="d-flex flex-wrap p-1 p-md-4">
					{resources.map((card, index) => (
						<ResourceCard icon={`/icons/${card.slug}.svg`} title={card.frontmatter.title} section={card.frontmatter.section} link={`/resources/portal/${card.slug}`} key={index} />
					)).sort((a, b) => a.props.section.localeCompare(b.props.section))}
				</div>
			</div>
		</section>
	)
}

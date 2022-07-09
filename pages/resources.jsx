import React from 'react'
import Layout from '../components/Layout'
import Hero from '../components/resources/Hero'
import ResourceGroups from '../components/resources/ResourceGroups'
import Events from '../components/resources/Events'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export default function articles({ otherInfo, studentResources, ruralResources, otherResources }) {
	return (
		<Layout pageTitle="RuDASA | Resources">
			<Hero content={otherInfo.find(file => file.slug === "description")} />
			<ResourceGroups student={studentResources} rural={ruralResources} other={otherResources} />
			<Events snt={otherInfo.find(file => file.slug === "survive-and-thrive")} 
					snts={otherInfo.find(file => file.slug === "survive-and-thrive-students")}
					onboarding={otherInfo.find(file => file.slug === "onboarding")}
					rhc={otherInfo.find(file => file.slug === "rural-health-conference")} />
		</Layout>
	)
}

export async function getStaticProps() {
	// Get files from the other information sub-directory
	const files = fs.readdirSync(path.join('markdown/resources/other-information'))

	// Get files from each resource subdirectory
	const student = fs.readdirSync(path.join('markdown/resources/resource/students'))
	const rural = fs.readdirSync(path.join('markdown/resources/resource/rural'))
	const other = fs.readdirSync(path.join('markdown/resources/resource/other'))

	// Get slug and markdown from other information
	const otherInfo = files.map((filename) => {
		const slug = filename.replace('.md', '')
		const markdown = fs.readFileSync(path.join('markdown/resources/other-information', filename), 'utf-8')

		const { data: frontmatter, content } = matter(markdown)

		return {
			slug,
			frontmatter,
			content
		}
	})

	// Get slug and markdown from student resource
	const studentResources = student.map((filename) => {
		const slug = filename.replace('.md', '')
		const markdown = fs.readFileSync(path.join('markdown/resources/resource/students', filename), 'utf-8')

		const { data: frontmatter, content } = matter(markdown)

		return {
			slug,
			frontmatter,
			content
		}
	})

	// Get slug and markdown from rural resource
	const ruralResources = rural.map((filename) => {
		const slug = filename.replace('.md', '')
		const markdown = fs.readFileSync(path.join('markdown/resources/resource/rural', filename), 'utf-8')

		const { data: frontmatter, content } = matter(markdown)

		return {
			slug,
			frontmatter,
			content
		}
	})

	// Get slug and markdown from other resource
	const otherResources = other.map((filename) => {
		const slug = filename.replace('.md', '')
		const markdown = fs.readFileSync(path.join('markdown/resources/resource/other', filename), 'utf-8')

		const { data: frontmatter, content } = matter(markdown)

		return {
			slug,
			frontmatter,
			content
		}
	})

	return {
		props: {
			otherInfo,
			studentResources,
			ruralResources,
			otherResources
		}
	}
}

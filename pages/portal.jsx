import React from 'react'
import Layout from '../components/Layout'
import Hero from '../components/portal/Hero'
import ResourceGroups from '../components/portal/ResourceGroups'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export default function Portal ({ resources, overview }) {

    return(
        <Layout pageTitle="RuDASA | Learning Portal" hide="true">
            <ResourceGroups resources={resources}/>
            <Hero overview={overview.find(file => file.slug === "overview").content}/>
		</Layout>
    )
}

export async function getStaticProps() {
	// Get files from the markdown sub-directory
	const resourceFiles = fs.readdirSync(path.join('markdown/resources/resource/portal'))
    const overviewFiles = fs.readdirSync(path.join('markdown/portal'))

	// Get slug and markdown from files
	const resources = resourceFiles.map((filename) => {
		const slug = filename.replace('.md', '')
		const markdown = fs.readFileSync(path.join('markdown/resources/resource/portal', filename), 'utf-8')

		const { data: frontmatter, content } = matter(markdown)

		return {
			slug,
			frontmatter,
			content
		}
	})

    // Get slug and markdown from files
	const overview = overviewFiles.map((filename) => {
        const slug = filename.replace('.md', '')
		const markdown = fs.readFileSync(path.join('markdown/portal', filename), 'utf-8')

		const { data: frontmatter, content } = matter(markdown)

		return {
			slug,
            frontmatter,
            content
		}
	})

	return {
		props: {
			resources,
            overview
		}
	}
}
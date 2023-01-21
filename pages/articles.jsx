import React from 'react'
import Layout from '../components/Layout'
import DoctorOfYear from '../components/articles-page/DoctorOfYear'
import Statements from '../components/articles-page/Statements'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export default function articles({ data }) {
	
	return (
		<Layout pageTitle="RuDASA | Articles">
			<DoctorOfYear markdown={data.find(file => file.slug === "doctor-of-the-year")} prevRecipients={data.find(file => file.slug === "previous-recipients")}/>
			<Statements markdown={data.find(file => file.slug === "press-statements")} />
		</Layout>
	)
}

export async function getStaticProps() {
	// Get files from the markdown sub-directory
	const files = fs.readdirSync(path.join('markdown/articles'))

	// Get slug and markdown from files
	const data = files.map((filename) => {
		const slug = filename.replace('.md', '')
		const markdown = fs.readFileSync(path.join('markdown/articles', filename), 'utf-8')

		const { data: frontmatter, content } = matter(markdown)

		return {
			slug,
			frontmatter,
			content
		}
	})

	return {
		props: {
			data
		}
	}
}

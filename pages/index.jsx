import Layout from '../components/Layout'
import Hero from '../components/landing-page/Hero'
import WhoAreWe from '../components/landing-page/WhoAreWe'
import WhatWeDo from '../components/landing-page/WhatWeDo'
import Advocacy from '../components/landing-page/Advocacy'
import SaWork from '../components/landing-page/SaWork'
import fs from 'fs' 
import path from 'path'
import matter from 'gray-matter'

export default function Home({ data }) {

	return (
		<Layout pageTitle="RuDASA | Home">
			<Hero/>
			<WhoAreWe content={data.find(file => file.slug === "who-are-we").frontmatter}/>
			<WhatWeDo content={data.find(file => file.slug === "what-we-do").content}/>
			<Advocacy content={data.find(file => file.slug === "advocacy-work").content} examples={data.find(file => file.slug === "advocacy-work-examples").content} />
			<SaWork content={data.find(file => file.slug === "working-in-sa").content} />
		</Layout>
	)
}

export async function getStaticProps() {
	// Get files from the markdown sub-directory
    const files = fs.readdirSync(path.join('markdown/home'))

    // Get slug and markdown from files
	const data = files.map((filename) => {
		const slug = filename.replace('.md', '')
		const markdown = fs.readFileSync(path.join('markdown/home', filename),'utf-8')

		const {data:frontmatter, content} = matter(markdown)

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
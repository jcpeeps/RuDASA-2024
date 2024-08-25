import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'
import Layout from '../components/Layout'
import CelebrateRuralMontage from '../components/celebrate-rural-montage/CelebrateRuralMontage'
import Advocacy from '../components/landing-page/Advocacy'
import Hero from '../components/landing-page/Hero'
import SaWork from '../components/landing-page/SaWork'
import WhatWeDo from '../components/landing-page/WhatWeDo'
import WhoAreWe from '../components/landing-page/WhoAreWe'
import Script from 'next/script';

export default function Home({ data }) {

	return (
		<Layout pageTitle="RuDASA | Home">
			<Hero/>
			<WhoAreWe content={data.find(file => file.slug === "who-are-we").frontmatter}/>
			<WhatWeDo content={data.find(file => file.slug === "what-we-do").content}/>
			<CelebrateRuralMontage images={data.find(file => file.slug === "celebrate-rural").content}/>
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
	
	// get images from public/media/celebrate-rural/
	const images = fs.readdirSync(path.join('public/media/celebrate-rural'));
	// prepend /media/celebrate-rural/ to each image
	images.forEach((image, index) => {
		images[index] = "/media/celebrate-rural/" + image;
	});
	// add images to data
	data.push({ slug: "celebrate-rural", frontmatter : "", content: images });

    return {
        props: {
            data
        }
    }
}
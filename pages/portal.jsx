import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import Hero from '../components/portal/Hero'
import ResourceGroups from '../components/portal/ResourceGroups'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Illustration from "/public/media/svg/portal.svg";
import Image from 'next/image'
import Link from 'next/link'
import { useInView } from 'react-intersection-observer';
import useUser from './api/useUser'

export default function Portal({ resources, overview }) {

    const { user } = useUser({ 
        redirectTo: '/login',
        redirectIfFound: false
    });

    let isLoading = false;
    // Server-render loading state
    if (!user || user.isLoggedIn === false) {
        isLoading = true;
    }

	const [visible, setVisible] = useState(false)

	const { ref, inView } = useInView({
		threshold: 0.3
	  });

	useEffect(() => {
		if (inView) setVisible(true)
	}, [inView])

	return isLoading ||
	(
		<Layout pageTitle="RuDASA | Rural Onboarding" hide="true">
			<div className="position-fixed team-svg d-none d-lg-block">
				<Image src={Illustration} width={700} alt="" />
			</div>

			<div className="py-5 mb-5"></div>
			
			<div className="container">
				<h4 className="fw-bold display-6 text-primary mt-5">Rural Onboarding {user?.email}</h4>
				<ResourceGroups resources={resources} />
			</div>

			<div id="overview" ref={ref}>
				<Hero overview={overview.find(file => file.slug === "overview").content} />
			</div>

			<div style={{ position: 'fixed', right: '30px', bottom: '30px' }} className={`${visible ? "d-none" : "d-block"}`}>
				<Link href="#overview">
					<a role="button" className="btn btn-lg btn-primary rounded-pill text-white mt-4">Overview</a>
				</Link>
			</div>
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
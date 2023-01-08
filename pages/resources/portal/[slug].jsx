import React from 'react'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { marked } from 'marked'
import Layout from '../../../components/Layout'
import Link from 'next/link'
import useUser from '../../api/useUser'

export default function ResourcePage({ frontmatter: { title }, content }) {
    const { user } = useUser({ 
        redirectTo: '/login',
        redirectIfFound: false
    });

    let isLoading = false;
    // Server-render loading state
    if (!user || user.isLoggedIn === false) {
        isLoading = true;
    }

    return isLoading ||
    (
        <Layout pageTitle={`RuDASA | ${title}`}>
            <div className="my-5 py-5" />
            <section className="container px-5">
                <div className="w-100 border-bottom pb-4 mb-5">
                    <div role="button" className="hover-button btn btn-primary">
                        <Link href="/portal">
                            <span className='text-decoration-none text-white'>Go back</span>
                        </Link>
                    </div>
                </div>
                <div id="markdown">
                    <h1 className="fw-bold my-5">{title}</h1>
                    <div className="mb-5 pb-5">
                        <div dangerouslySetInnerHTML={{ __html: marked(content) }} />
                    </div>
                </div>
            </section>
        </Layout>
    )
}

export async function getStaticPaths() {
    const files = fs.readdirSync(path.join('markdown/resources/resource/portal'))

    const paths = files.map(filename => ({
        params: {
            slug: filename.replace('.md', '')
        }
    }))

    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({ params: { slug } }) {
    const markdown = fs.readFileSync(path.join('markdown/resources/resource/portal', slug + '.md'), 'utf-8')

    const { data: frontmatter, content } = matter(markdown)
    return {
        props: {
            frontmatter,
            slug,
            content
        }
    }
}
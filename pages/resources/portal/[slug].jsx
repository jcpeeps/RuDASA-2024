import React from 'react'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { marked } from 'marked'
import Layout from '../../../components/Layout'

export default function resourcePage({frontmatter:{title},content}) {
    return (
        <Layout pageTitle={`RuDASA | ${title}`}>
            <div className="my-5 py-5" />
            <section className="container">
                <div className="w-100 border-bottom pb-4 mb-5">
                    <a href="/resources" role="button" className="btn btn-primary text-white hover-button">Go back</a>
                </div>
                <h1 className="fw-bold my-5">{title}</h1>
                <article className="mb-5 pb-5">
                    <div dangerouslySetInnerHTML={{ __html: marked(content) }} />
                </article>
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
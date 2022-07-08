import React from 'react'
import Layout from '../components/Layout'
import Hero from '../components/about-us/Hero'
import Team from '../components/about-us/Team'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export default function about({ data }) {

  return (
    <Layout pageTitle="RuDASA | About Us">
      <Hero content={data.find(file => file.slug === "meet-the-team")} />
      <Team executives={data.find(file => file.slug === "executive-committee")} portfolios={data.find(file => file.slug === "portfolios")} />
    </Layout>
  )
}

export async function getStaticProps() {
  // Get files from the markdown sub-directory
  const files = fs.readdirSync(path.join('markdown/about'))

  // Get slug and markdown from files
  const data = files.map((filename) => {
    const slug = filename.replace('.md', '')
    const markdown = fs.readFileSync(path.join('markdown/about', filename), 'utf-8')

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

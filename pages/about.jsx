import React from 'react'
import Layout from '../components/Layout'
import Hero from '../components/about-us/Hero'
import Team from '../components/about-us/Team'

export default function about() {
  return (
    <Layout pageTitle="RuDASA | About Us">
      <Hero/>
      <Team/>
		</Layout>
  )
}

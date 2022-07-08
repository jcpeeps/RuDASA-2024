import React from 'react'
import Layout from '../components/Layout'
import Hero from '../components/resources/Hero'
import ResourceGroups from '../components/resources/ResourceGroups'
import Events from '../components/resources/Events'

export default function articles() {
  return (
    <Layout pageTitle="RuDASA | Resources">
      <Hero/>
      <ResourceGroups/>
      <Events/>
		</Layout>
  )
}

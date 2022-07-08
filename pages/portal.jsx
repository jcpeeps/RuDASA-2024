import React from 'react'
import Layout from '../components/Layout'
import Hero from '../components/portal/Hero'
import ResourceGroups from '../components/portal/ResourceGroups'

export default function Portal () {
    return(
        <Layout pageTitle="RuDASA | Learning Portal">
            <ResourceGroups/>
            <Hero/>
		</Layout>
    )
}
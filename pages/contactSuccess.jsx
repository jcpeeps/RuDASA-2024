import React from 'react'
import Layout from '../components/Layout'
import Hero from '../components/about-us/Hero'
import Team from '../components/about-us/Team'

export default function about({ data }) {

	return (
        <Layout>
          <br/><br/><br/><br/><br/><br/><br/>
		  <h1 style={{textAlign: "center"}}>Success!</h1>
		  <br/>
		  <h4 style={{textAlign: "center"}}>
			The contact form was submitted successfully.
			We&apos;ll get back to you shortly :)
		  </h4>
		  <br/> <br/> <br/>
        </Layout>
	)
}
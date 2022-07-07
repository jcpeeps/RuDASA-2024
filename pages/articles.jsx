import React from 'react'
import Layout from '../components/Layout'
import DoctorOfYear from '../components/articles-page/DoctorOfYear'
import Statements from '../components/articles-page/Statements'

export default function articles() {
	return (
		<Layout pageTitle="RuDASA | Articles">
			<DoctorOfYear/>
			<Statements/>
		</Layout>
	)
}

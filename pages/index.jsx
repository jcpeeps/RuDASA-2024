import Layout from '../components/Layout'
import Hero from '../components/landing-page/Hero'
import WhoAreWe from '../components/landing-page/WhoAreWe'
import WhatWeDo from '../components/landing-page/WhatWeDo'
import Advocacy from '../components/landing-page/Advocacy'
import SaWork from '../components/landing-page/SaWork'

export default function Home() {
	return (
		<Layout pageTitle="RuDASA | Home">
			<Hero/>
			<WhoAreWe/>
			<WhatWeDo/>
			<Advocacy/>
			<SaWork/>
		</Layout>
	)
}

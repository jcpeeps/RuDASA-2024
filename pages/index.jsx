import Head from 'next/head'
import Image from 'next/image'
import Layout from '../components/Layout'
import Logo from '../media/svg/logo.svg'


export default function Home() {
	return (
		<Layout pageTitle="RuDASA | Home">
			<section className="container h-100 d-flex align-items-center justify-content-between">
				<div className="row mb-5 pb-5">
					<div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
						<Image src={Logo} />
					</div>
					<div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
						<h1 className="display-3 fw-bold mb-5">Inspiring others towards rural health</h1>
						<div className="d-flex">
							<div className="gradient-outline me-3">
								<a href="/sign-up" role="button" className="btn btn-primary btn-lg gradient-background text-white fw-bold">Sign Up</a>
							</div>
							<div className="gradient-outline">
								<a href="#" role="button" className="btn btn-outline-primary btn-lg fw-bold">Learn More</a>
							</div>
						</div>
					</div>
				</div>
			</section>
			<section className="bg-light">
				<div className="container">
					
				</div>
			</section>
		</Layout>
	)
}

import Head from 'next/head'
import Image from 'next/image'
import Layout from '../components/Layout'
import Logo from '../media/svg/logo.svg'
import Illustration1 from '../media/svg/who-are-we.svg'
import Illustration2 from '../media/svg/what-we-do.svg'

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
				<div className="container py-5">
					<div className="row my-5 py-5">
						<div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
							<h1 className="display-4 fw-bold mb-5">Who are we?</h1>
							<div>
								<h4 className="text-primary fw-bold">Our Vision</h4>
								<p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quasi quia unde doloribus quae dicta officiis, laborum officia beatae accusamus dolore nesciunt? Officiis dolor temporibus, molestiae impedit provident tempore earum cum?</p>
								<h4 className="text-primary fw-bold">Our Mission</h4>
								<p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quasi quia unde doloribus quae dicta officiis, laborum officia beatae accusamus dolore nesciunt? Officiis dolor temporibus, molestiae impedit provident tempore earum cum?</p>
							</div>
							<div className="w-100 text-end">
								<a href="/about" role="button" className="btn btn-lg btn-primary gradient-background text-white mt-4">Meet our team</a>
							</div>
						</div>
						<div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 text-center">
							<Image src={Illustration1} />
						</div>
					</div>
				</div>
			</section>
			<section>
				<div className="container py-5">
					<div className="row my-5 py-5">
						<div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 text-center">
							<Image src={Illustration2} />
						</div>
						<div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
							<h1 className="display-4 fw-bold mb-5">What do we do?</h1>
							<div>
								<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia quod dolor modi provident odio rem! Dolorum quidem illo voluptas fuga impedit, cumque repudiandae sunt autem libero perspiciatis iusto corrupti nisi nobis maiores eaque nulla adipisci voluptatibus mollitia eos ipsam quaerat, ipsa aliquam? Perspiciatis est, doloribus vitae ea nihil aspernatur illo sint aliquid quaerat odio minima esse, atque excepturi reprehenderit! Sit.</p>
							</div>
							<div>
								<a href="/about" role="button" className="btn btn-lg btn-primary gradient-background text-white mt-4">Become a member</a>
							</div>
						</div>
					</div>
				</div>
			</section>
		</Layout>
	)
}

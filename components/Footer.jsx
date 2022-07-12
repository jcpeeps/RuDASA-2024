import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons'
import { faSprout, faHandHoldingMedical, faShareNodes, faMugSaucer } from '@fortawesome/free-solid-svg-icons'

export default function Footer() {
	return (
		<footer className="bg-secondary pt-5 pb-3">
			<div className="container mt-5 mb-3 d-flex flex-column align-items-center">
				<div className="row w-100 d-flex flex-column flex-md-row justify-content-center align-items-center">
					<div className="col-sm-12 col-md-12 col-lg-3 text-center text-lg-start">
						<h5 className="text-white">Our Values</h5>
						<ul className="list-unstyled">
							<li><a href="#" className="text-white text-decoration-none">Value statement</a></li>
							<li><a href="#" className="text-white text-decoration-none">Code of Conduct</a></li>
						</ul>
					</div>
					<div className="col-sm-12 col-md-12 col-lg-3  text-center text-lg-start">
						<h5 className="text-white">Find a Hospital</h5>
						<ul className="list-unstyled">
							<li><a href="#" className="text-white text-decoration-none">Hospitals in South Africa</a></li>
							<li><a href="#" className="text-white text-decoration-none">Government hospitals</a></li>
							<li><a href="#" className="text-white text-decoration-none">Rural hospitals</a></li>
						</ul>
					</div>
					{/* (move to students) <div className="col-sm-12 col-md-12 col-lg-3 text-center text-lg-start">
						<h5 className="text-white">HST Email Discussion Groups</h5>
						<ul className="list-unstyled">
							<li><a href="#" className="text-white text-decoration-none">Drug Policy & Practice</a></li>
							<li><a href="#" className="text-white text-decoration-none">Health & Human Rights</a></li>
							<li><a href="#" className="text-white text-decoration-none">60percent</a></li>
						</ul>
					</div> */}
					<div className="col d-flex flex-column">
						<div className="bg-white rounded p-2 my-1 w-100"><a href="#" className="text-black text-decoration-none"><FontAwesomeIcon icon={faShareNodes}/> Rural Health Conference</a></div>
						<div className="bg-white rounded p-2 p my-1 w-100"><a href="#" className="text-black text-decoration-none"><FontAwesomeIcon icon={faSprout}/> Rural Students Facebook</a></div>
						<div className="bg-warning rounded p-2 p my-1 w-100"><a href="#" className="text-black text-decoration-none"><FontAwesomeIcon icon={faMugSaucer}/> Buy me a coffee</a></div>
					</div>
				</div>
				<div className="w-25 d-flex justify-content-center mt-4">
					<a href="#"><FontAwesomeIcon icon={faFacebook} size="2x" className="text-white p-2"/></a>
					<a href="#"><FontAwesomeIcon icon={faTwitter} size="2x" className="text-white p-2"/></a>
					<a href="#"><FontAwesomeIcon icon={faInstagram} size="2x" className="text-white p-2"/></a>
					<a href="#"><FontAwesomeIcon icon={faHandHoldingMedical} size="2x" className="text-white p-2"/></a>
				</div>
				<div className="w-25 d-flex justify-content-center mt-4">
					<h5 className="text-white">168-404NPO</h5>
				</div>
			</div>
		</footer>
	)
}

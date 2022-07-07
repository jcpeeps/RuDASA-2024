import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons'
import { faSprout } from '@fortawesome/free-solid-svg-icons'
import { faShareNodes } from '@fortawesome/free-solid-svg-icons'
import { faHandHoldingMedical } from '@fortawesome/free-solid-svg-icons'

export default function Footer() {
	return (
		<footer className="bg-secondary pt-5 pb-3">
			<div className="container mt-5 mb-3 d-flex flex-column align-items-center">
				<div className="row w-100">
					<div className="col-3">
						<h5 className="text-white">Our Values</h5>
						<ul className="list-unstyled">
							<li><a href="#" className="text-white text-decoration-none">Value statement</a></li>
							<li><a href="#" className="text-white text-decoration-none">Code of Conduct</a></li>
						</ul>
					</div>
					<div className="col-3">
						<h5 className="text-white">Find a Hospital</h5>
						<ul className="list-unstyled">
							<li><a href="#" className="text-white text-decoration-none">Hospitals in South Africa</a></li>
							<li><a href="#" className="text-white text-decoration-none">Government hospitals</a></li>
							<li><a href="#" className="text-white text-decoration-none">Rural hospitals</a></li>
						</ul>
					</div>
					<div className="col-3">
						<h5 className="text-white">HST Email Discussion Groups</h5>
						<ul className="list-unstyled">
							<li><a href="#" className="text-white text-decoration-none">Drug Policy & Practice</a></li>
							<li><a href="#" className="text-white text-decoration-none">Health & Human Rights</a></li>
							<li><a href="#" className="text-white text-decoration-none">60percent</a></li>
						</ul>
					</div>
					<div className="col-3 d-flex flex-column">
						<div className="bg-white rounded p-3 mb-3 w-75">
							<FontAwesomeIcon icon={faShareNodes} className="me-2" />
							Rural Health Conference
						</div>
						<div className="bg-white rounded p-3 w-75">
							<FontAwesomeIcon icon={faSprout} className="me-2" />
							Rural Seeds Forum
						</div>
						<div className="bg-white rounded"></div>
					</div>
				</div>
				<div className="w-25 d-flex justify-content-around my-4">
					<FontAwesomeIcon icon={faFacebook} className="fs-1 text-white" />
					<FontAwesomeIcon icon={faTwitter} className="fs-1 text-white" />
					<FontAwesomeIcon icon={faInstagram} className="fs-1 text-white" />
					<FontAwesomeIcon icon={faHandHoldingMedical} className="fs-1 text-white" />
				</div>
			</div>
		</footer>
	)
}

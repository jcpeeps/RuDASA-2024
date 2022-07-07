import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons'
import { faSprout } from '@fortawesome/free-solid-svg-icons'
import { faShareNodes } from '@fortawesome/free-solid-svg-icons'
import { faHandHoldingMedical } from '@fortawesome/free-solid-svg-icons'

export default function Footer() {
	return (
		<footer className="bg-secondary py-5">
			<div className="container my-5">
				<div className="row">
					<div className="col">
						<h5 className="text-white">Our Values</h5>
						<ul className="list-unstyled">
							<li><a href="#" className="text-white text-decoration-none">Value statement</a></li>
							<li><a href="#" className="text-white text-decoration-none">Code of Conduct</a></li>
						</ul>
					</div>
					<div className="col">
						<h5 className="text-white">Find a Hospital</h5>
						<ul className="list-unstyled">
							<li><a href="#" className="text-white text-decoration-none">Hospitals in South Africa</a></li>
							<li><a href="#" className="text-white text-decoration-none">Government hospitals</a></li>
							<li><a href="#" className="text-white text-decoration-none">Rural hospitals</a></li>
						</ul>
					</div>
					<div className="col">
						<h5 className="text-white">HST Email Discussion Groups</h5>
						<ul className="list-unstyled">
							<li><a href="#" className="text-white text-decoration-none">Drug Policy & Practice</a></li>
							<li><a href="#" className="text-white text-decoration-none">Health & Human Rights</a></li>
							<li><a href="#" className="text-white text-decoration-none">60percent</a></li>
						</ul>
					</div>
					<div className="col d-flex flex-column">
						<div className="bg-white rounded p-2"><FontAwesomeIcon icon={faShareNodes}/></div>
						<div className="bg-white rounded p-2"><FontAwesomeIcon icon={faSprout}/>Rural Seeds Forum</div>
						<div className="bg-white rounded"></div>
					</div>
				</div>
				<div className="w-100 d-flex justify-content-center">
					<FontAwesomeIcon icon={faFacebook}/>
					<FontAwesomeIcon icon={faTwitter}/>
					<FontAwesomeIcon icon={faInstagram}/>
					<FontAwesomeIcon icon={faHandHoldingMedical}/>
				</div>
			</div>
		</footer>
	)
}

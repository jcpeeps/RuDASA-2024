import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons'

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

					</div>
					<div className="col">

					</div>
					<div className="col">

					</div>
				</div>
				<div className="w-100 d-flex justify-content-center">
					<FontAwesomeIcon icon={faFacebook}/>
					<FontAwesomeIcon icon={faTwitter}/>
					<FontAwesomeIcon icon={faInstagram}/>
				</div>
			</div>
		</footer>
	)
}

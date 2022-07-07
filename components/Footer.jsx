import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons'

export default function Footer() {
	return (
		<footer className="bg-secondary">
			<div className="container">
				<div className="row">
					<div className="col">
						<h5>Our Values</h5>
						<ul>
							<li><a href="#">Value statement</a></li>
							<li><a href="#">Code of Conduct</a></li>
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

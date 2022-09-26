import React from 'react'
import Image from 'next/image'

export default function ResourceCard(props) {
	return (
		<div className='resc-card-width bg-white shadow rounded m-1 m-md-3 d-flex flex-column justify-content-between'>
			<div className="p-3 d-flex flex-column align-items-center justify-content-center">
				<a href={props.link} className="text-black text-decoration-none d-flex flex-column align-items-center">
					<p className="fw-bold text-center">{props.title}</p>
					<div className="d-flex justify-content-center">
						<Image src={props.icon} width={70} height={70} alt={props.title} />
					</div>
				</a>
			</div>
			{props.section && props.section != "0" ?	
				<div className='text-center mt-3 py-1 rounded-bottom' style={{ backgroundColor: '#e6e6e6' }}>
					<small className="text-white fw-bold">Section {props.section}</small>
				</div>
					
				: ""
			}
		</div>
	)
}

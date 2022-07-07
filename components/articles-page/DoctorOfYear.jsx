import React from 'react'
import Image from 'next/image'
import Portrait from '../../media/doctor-of-the-year/portrait.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouseMedical, faLocationDot } from '@fortawesome/free-solid-svg-icons'

export default function DoctorOfYear() {
    return (
        <section className="container">
            <h1 className="dispaly-4 fw-bold text-primary mb-5">Articles</h1>
            <h3 className="my-4 pb-4">Rural Doctor of the Year 2022</h3>
            <div className="row">
                <div className="col-sm-12 col-md-4 col-lg-4 d-flex">
                    <Image src={Portrait} width={230} height={230} className="rounded-circle" />
                    <div className="ms-5">
                        <h5 className="fw-bold mb-3">Dr Pierre Jaques</h5>
                        <div className="d-flex mb-2">
                            <FontAwesomeIcon icon={faHouseMedical} className="text-primary me-2" />
                            <p className="m-0">Madwaleni hospital</p>
                        </div>
                        <div className="d-flex">
                            <FontAwesomeIcon icon={faLocationDot} className="text-primary me-2" />
                            <p className="m-0">Eastern Cape</p>
                        </div>
                    </div>
                </div>
                <div className="col-sm-12 col-md-6 col-lg-6 offset-md-1 offset-lg-1">
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex velit libero, expedita excepturi officiis vero perferendis! Ex doloribus itaque asperiores ullam sequi quidem saepe fugiat, assumenda, tempore ab nihil nisi veritatis aspernatur hic et eaque explicabo sunt repellendus beatae magni.</p>
                </div>
            </div>
            <div className="row">
                <div className="col"></div>
                <div className="col"></div>
            </div>
        </section>
    )
}

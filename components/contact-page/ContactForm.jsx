import React from 'react'
import Image from 'next/image'
import Illustration3 from '../../media/svg/contact.svg'
export default function ContactForm (){
    return (
        <div className="container-fluid d-flex justify-content-center mt-5 mb-3">
            <Image src={Illustration3} className="col-sm-12 col-md-12 col-lg-5 col-xl-5"/>
            <form className="col-sm-12 col-md-12 col-lg-5 col-xl-5 px-4 d-flex flex-column align-items-center">
                <h3 className="fw-bold w-100">Contact us</h3>
                <div className="mt-3 w-100 d-flex justify-content-between">
                    <div className="">
                        <label for="fullName" className="text-primary fw-bold form-label ms-2">Full Name</label>
                        <input id="fullName" className="form-control border-0 border-bottom" type="text" placeholder="Name"/>
                    </div>
                    <div className="">
                        <label for="email" className="text-primary fw-bold form-label ms-2">Email Address</label>
                        <input id="email" className="form-control border-0 border-bottom" type="email" placeholder="Email Address"/>
                    </div>
                </div>
                <div className="mt-3 w-100">
                    <div className="">
                        <label for="subject" className="text-primary fw-bold form-label ms-2">Subject</label>
                        <input id="subject" className="form-control border-0 border-bottom" type="text" placeholder="Subject"/>
                    </div>
                </div>
                <div className="mt-3 w-100">
                    <div className="">
                        <label for="msg" className="text-primary fw-bold form-label ms-2">Message</label>
                        <textarea id="msg" className="w-100 h-100 border-0 border-bottom ms-2 p-3" rows="8" placeholder="Message"/>
                    </div>
                </div>
            </form>
        </div>
    )
}
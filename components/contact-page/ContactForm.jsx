import React from 'react'
import Image from 'next/image'
import Illustration3 from '../../media/svg/contact.svg'
export default function ContactForm (){
    return (
        <div className="container-fluid d-flex justify-content-center align-items-center mt-5 mb-5 pb-5">
            <Image src={Illustration3} className="col-sm-12 col-md-12 col-lg-5 col-xl-5" width={600} height={600}/>
            <form className="col-sm-12 col-md-12 col-lg-5 col-xl-5 px-4 d-flex flex-column align-items-center ms-5">
                <h3 className="fw-bold w-100 mb-4">Contact us</h3>
                <div className="mt-3 w-100 d-flex justify-content-between">
                    <div className="w-50 me-5">
                        <label for="fullName" className="text-primary fw-bold form-label ms-2">Full Name</label>
                        <input id="fullName" className="form-control border-0 border-bottom" type="text" placeholder="Name"/>
                    </div>
                    <div className="w-50">
                        <label for="email" className="text-primary fw-bold form-label ms-2">Email Address</label>
                        <input id="email" className="form-control border-0 border-bottom" type="email" placeholder="Email"/>
                    </div>
                </div>
                <div className="my-5 w-100">
                    <div className="">
                        <label for="subject" className="text-primary fw-bold form-label ms-2">Subject</label>
                        <input id="subject" className="form-control border-0 border-bottom" type="text" placeholder="Subject"/>
                    </div>
                </div>
                <div className="mt-3 w-100">
                    <div className="">
                        <label for="msg" className="text-primary fw-bold form-label ms-2">Message</label>
                        <textarea id="msg" className="w-100 h-100 border-0 border-bottom ms-2 p-3 bg-light" rows="8" placeholder="Type here..."/>
                    </div>
                </div>
                <div className="text-end w-100 my-4">
                    <input className="btn btn-secondary btn-lg" type="submit" value="Send" />
                </div>
            </form>
        </div>
    )
}
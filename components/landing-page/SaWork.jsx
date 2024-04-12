import React from 'react'
import { marked } from 'marked'

export default function SaWork({ content }) {

	return (
		<section>
            <div className="container py-3 py-lg-5 px-4 px-md-0 mb-5">
                <h1 className="fw-bold my-5">Working in South Africa</h1>
                <article>
                    <div dangerouslySetInnerHTML={{ __html: marked(content) }} />
                </article>
                <div className="w-100 text-end d-flex justify-content-center">
                    <div className="hover-button">
                        <Link href="https://www.dpsa.gov.za/newsroom/psvc/" className="mx-5">
                            <a role="button" className="btn btn-lg btn-primary gradient-background text-white mt-4 mx-3">Government Jobs</a>
                        </Link>
                    </div>
                    <div className="hover-button">
                        <Link href="https://ngopulse.net/" className="mx-5">
                            <a role="button" className="btn btn-lg btn-primary gradient-background text-white mt-4 mx-3" target="_blank">NGO Pulse</a>
                        </Link>
                    </div>
                    <div className="hover-button">
                        <Link href="http://hpcsa.co.za/?contentId=0&menuSubId=5&actionName=Core%20Operations" className="mx-5">
                            <a role="button" className="btn btn-lg btn-primary gradient-background text-white mt-4 mx-3" target="_blank">Info for Foreign Grads</a>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
	)
}

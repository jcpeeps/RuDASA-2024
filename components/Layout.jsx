import React from 'react'
import Head from 'next/head'
import Navbar from './Navbar'
import Footer from './Footer'

const Layout = (props) => {

    return (
        <>
            <Head>
                <title>{props.pageTitle}</title>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
                <meta name="description" content="This is the official site for RuDASA. The Rural Doctors Association of Southern Africa (RuDASA) strives inspire others towards rural healthcare in South Africa. Our aim is to support and empower those committed to making health care available to all South Africans." />
                <meta name="author" content="RuDASA" />
                <meta name="robots" content="follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large"/>
                <meta name="keywords" content="rudasa, health, rural health, doctor, doctors association, south africa" />
            </Head>

            <div>
                <Navbar />
                <main>
                    {props.children}
                </main>
            </div>

            <div className={props.hide == "true" ? "d-none" : ""}>
                <Footer />
            </div>
        </>
    )
}
export default Layout;
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
            </Head>
            <Navbar/>
            <main>
                {props.children}
            </main>
            <Footer/>
        </>
    )
}
export default Layout;
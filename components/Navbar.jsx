import React from 'react'
import { Nav, Button, Navbar } from 'react-bootstrap';
import { useRouter } from 'next/router'

export default function Navigation() {

    const router = useRouter();

    return (
        <Navbar collapseOnSelect expand="lg" bg="white" variant="light" className="p-4 position-fixed w-100 navbar-z-index">
            <Navbar.Brand href="/" className="fw-bold">
                RuDASA
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="navbar-nav ms-auto w-50 d-flex justify-content-around align-items-center">
                    <Nav.Link className={router.pathname == "/" ? "active" : ""} href="/">Home</Nav.Link>
                    <Nav.Link className={router.pathname == "/about" ? "active" : ""} href="/about">About Us</Nav.Link>
                    <Nav.Link className={router.pathname == "/articles" ? "active" : ""} href="/articles">Articles</Nav.Link>
                    <Nav.Link className={router.pathname == "/resources" ? "active" : ""} href="/resources">Resources</Nav.Link>
                    <Nav.Link className={router.pathname == "/contact" ? "active" : ""} href="/contact">Contact Us</Nav.Link>
                    <Nav.Link href="/login">
                        <Button className="nav-link p-3 text-white gradient-background shadow">Learning Portal</Button>
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}
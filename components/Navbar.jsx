import React from 'react'
import { Nav, Button } from 'react-bootstrap';
import Link from 'next/link'

export default function Navbar() {
    return (
        <Nav className="navbar navbar-expand-lg navbar-light bg-white p-4">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample07XL" aria-controls="navbarsExample07XL" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarsExample07XL">
                <ul className="navbar-nav ms-auto w-50 d-flex justify-content-around align-items-center">
                    <li className="nav-item active">
                        <Link href="/">
                            <a className="nav-link">Home</a>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link href="/about">
                            <a className="nav-link">About Us</a>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link href="/articles">
                            <a className="nav-link">Articles</a>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link href="/resources">
                            <a className="nav-link">Resources</a>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link href="/contact">
                            <a className="nav-link">Contact Us</a>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link href="/portal">
                            <Button className="nav-link p-3 text-white gradient-background">Learning Portal</Button>
                        </Link>
                    </li>
                </ul>
            </div>
        </Nav >
  )
}
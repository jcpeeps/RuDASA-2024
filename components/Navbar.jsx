import React, { useState, useEffect } from 'react';
import { Nav, Button, Navbar } from 'react-bootstrap';
import { useRouter } from 'next/router';
import useUser from '../pages/api/useUser';
import fetchJson from '../pages/api/fetchJson';

export default function Navigation() {

    const { user, mutateUser } = useUser();
    const router = useRouter();

    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [visible, setVisible] = useState(true);
        
    //Called when the logout button is pressed
    const handleLogout = async () => {
        try
        {
            const response = await fetchJson('/api/logout', { method: "POST" });

            mutateUser(response);

        } catch (error) {
            console.error("FATAL ERROR\n" + error.data.message);
        }
    }

    function getLoginTitle()
    {
        if(user?.isLoggedIn)
        {
            return <>
                Learning Portal
                <br/>
                ( {user.email} )
            </>;
        }
        else
        {
            return "Learning Portal";
        }
    }

    function debounce(func, wait, immediate) {
        var timeout;
        return function() {
            var context = this, args = arguments;
            var later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    };

    const handleScroll = debounce(() => {
        const currentScrollPos = window.pageYOffset;

        setVisible((prevScrollPos > currentScrollPos && prevScrollPos - currentScrollPos > 70) || currentScrollPos < 10);

        setPrevScrollPos(currentScrollPos);
    }, 100);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);

    }, [prevScrollPos, visible, handleScroll]);

    return (
        <Navbar collapseOnSelect expand="lg" bg="white" variant="light" className="p-4 position-fixed w-100 navbar-z-index" style={{top: visible ? '0' : '-100px'}}>
            <Navbar.Brand href="/" className="fw-bold d-lg-none">
                RuDASA
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="navbar-nav ms-auto w-auto d-flex justify-content-around align-items-center">
                    <Nav.Link className={router.pathname == "/" ? "active" : ""} href="/">Home</Nav.Link>
                    <Nav.Link className={router.pathname == "/about" ? "active" : ""} href="/about">About Us</Nav.Link>
                    <Nav.Link className={router.pathname == "/articles" ? "active" : ""} href="/articles">Articles</Nav.Link>
                    <Nav.Link className={router.pathname == "/resources" ? "active" : ""} href="/resources">Resources</Nav.Link>
                    <Nav.Link className={router.pathname == "/contact" ? "active" : ""} href="/contact">Contact Us</Nav.Link>
                    <Nav.Link href={(user?.isLoggedIn)?"/portal":"/login"}>
                        <div className="hover-button">
                            <Button className="nav-link p-3 text-white gradient-background shadow">{ getLoginTitle() }</Button>
                        </div>
                    </Nav.Link>

                    { //Show logout button when
                        (user?.isLoggedIn)?
                        (
                            <Nav.Link href="/api/logout" onClick={
                                async (e) => {
                                    e.preventDefault();
                                    handleLogout();
                                }
                            }> Log out </Nav.Link>
                        ):""
                    }
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}
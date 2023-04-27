import React from 'react'
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap'
import { BsFacebook, BsEnvelope, BsTelephone } from 'react-icons/bs';
import { NavLink, Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { signout } from '../../actions/authActions';



const Header = () => {

    const navigate = useNavigate();
    const authenticated = useSelector(state => state.auth.authenticated);
    const dispatch = useDispatch();


    const logout = () => {
        dispatch(signout());
    }



    const renderLoggedIn = () => {
        return (
            <Nav>
                    <NavLink className="nav-link" onClick={logout}>Sign out</NavLink>
            </Nav>
        );
    }
    const renderNonLoggedIn = () => {
        return (
            <Nav>
                <NavLink to="/signin" className="nav-link" >Sign In</NavLink>
                <NavLink to="/signup" className="nav-link" >Sign Up</NavLink>

            </Nav>
        );
    }


    return (
        <>

            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container fluid>
                    <Navbar.Brand href="#home">IHERB</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link onClick={() => navigate('/')}>HOME</Nav.Link>
                            <Nav.Link onClick={() => navigate('/orderedItems')}>SOLUTIONS</Nav.Link>
                            <Nav.Link onClick={() => navigate('/inqtable')}>SERVICES</Nav.Link>


                        </Nav>
                        {authenticated ? renderLoggedIn() : renderNonLoggedIn()}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}


export default Header

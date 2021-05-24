import React from 'react';
import {Navbar,Nav, NavItem} from 'react-bootstrap';
import {CodeSlash} from 'react-bootstrap-icons';
import logo from '../logo.png';


const HeaderMenu = (props) =>{

    return(
        <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand>
                    <img src={logo} className="d-inline-block align-top"/>
            </Navbar.Brand>
            <Navbar.Collapse>
                <Nav className="ml-auto">
                    <NavItem><span  style={{color:"white"}}><CodeSlash/><span className="px-2">CART API SIMULATOR</span></span></NavItem>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )

}

export default HeaderMenu;
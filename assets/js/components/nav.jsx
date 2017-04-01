import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';
import { Collapse, Navbar as BSNavbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import urls from 'common/urls';
import {LogoutButton, LoginButton} from 'main/registration';

class Navbar extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    render() {
        return (
            <div>
                <BSNavbar color="faded" light toggleable>
                    <NavbarToggler right onClick={this.toggle} />
                    <NavbarBrand href={urls.root}>Leagion</NavbarBrand>
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <LogoutButton />
                                <LoginButton />
                            </NavItem>
                        </Nav>
                    </Collapse>
                </BSNavbar>
            </div>
        );
    }
}

module.exports = {
    Navbar: Navbar
}

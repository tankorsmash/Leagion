import ajax from 'common/ajax';

import {Link} from 'react-router-dom';

import { Collapse, Navbar as BSNavbar, NavbarToggler,
    NavbarBrand, NavDropdown, DropdownToggle, DropdownMenu,
    DropdownItem, Nav, NavItem, NavLink
} from 'reactstrap';

import urls from 'common/urls';
import {LogoutButton, LoginButton} from 'components/buttons';
import auth from 'main/auth';
import {Navbar} from 'components/nav/base'

import {NOT_LOADED, DO_NOTHING, STOP_PROPAGATION} from 'common/constants';

class PublicItems extends React.Component {
    render() {
        return (
            <Nav navbar>
                <NavItem>
                    Public Items
                </NavItem>
            </Nav>
        )
    }
}

class PublicProfile extends React.Component {
    render() {
        return (
            <Nav className="ml-auto" navbar>
				<NavLink tag={LoginButton} />
            </Nav>
        )
    }
}

class PublicNavbar extends Navbar {
	itemComponent = PublicItems;
	profileComponent = PublicProfile;

}

module.exports = PublicNavbar;

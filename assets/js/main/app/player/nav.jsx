import ajax from 'common/ajax';

import {Link} from 'react-router-dom';

import { Collapse, Navbar as BSNavbar, NavbarToggler,
    NavbarBrand, NavDropdown, DropdownToggle, DropdownMenu,
    DropdownItem, Nav, NavItem, NavLink
} from 'reactstrap';

import urls from 'common/urls';
import {LogoutButton, LoginButton, AdminButton} from 'components/buttons';
import auth from 'main/auth';
import {Navbar} from 'components/nav/base'
import {BaseAppProfile} from 'main/app/components/nav';

class PlayerItems extends React.Component {
    render() {
        return (
            <Nav navbar>
                <NavItem>
                    Player nav item
                </NavItem>
            </Nav>
        )
    }
}

class PlayerProfile extends BaseAppProfile {
	items = [AdminButton, LogoutButton];
}


class PlayerNavbar extends Navbar {
	itemComponent = PlayerItems;
	profileComponent = PlayerProfile;

}

module.exports = PlayerNavbar;

import ajax from 'common/ajax';

import {Link} from 'react-router-dom';

import { Collapse, Navbar as BSNavbar, NavbarToggler,
    NavbarBrand, NavDropdown, DropdownToggle, DropdownMenu,
    DropdownItem, Nav, NavItem, NavLink
} from 'reactstrap';

import adminUrls from 'main/app/admin/urls';
import {LogoutButton, LoginButton} from 'components/buttons';
import auth from 'main/auth';
import {Appbar} from 'components/nav/base'
import {BaseAppProfile} from 'main/app/components/nav';

import {NOT_LOADED, DO_NOTHING, STOP_PROPAGATION} from 'common/constants';

class AdminNavItems extends React.Component {
    constructor(props) {
        super(props);

        this.toggleCreateDropdown = this.toggleCreateDropdown.bind(this);

        this.state = {
            createDropdownOpen: false,
        };
    }

    toggleCreateDropdown() {
        this.setState({
            createDropdownOpen: !this.state.createDropdownOpen
        });
    }

    render() {
        return (
            <Nav navbar>
                <Link className="nav-link" to={adminUrls.dashboard.index}> Dashboard </Link>
            </Nav>
        );
    }
}

class AdminProfile extends BaseAppProfile {
    getItems = () => {
        return [LogoutButton];
    };
}

class AdminNavbar extends Appbar {
	itemComponent = AdminNavItems;
	profileComponent = AdminProfile;
}

module.exports = AdminNavbar;

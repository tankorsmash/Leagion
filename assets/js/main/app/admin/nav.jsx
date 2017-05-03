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

                {/* Leagues */}
                <Link to={adminUrls.leagues.index} className="nav-link">
                    Leagues
                </Link>

                {/* Seasons */}
                <Link to={adminUrls.seasons.index} className="nav-link">
                    Seasons
                </Link>

                {/* Teams */}
                <Link to={adminUrls.teams.index} className="nav-link">
                    Teams
                </Link>

                {/* Matches */}
                <Link to={adminUrls.matches.index} className="nav-link">
                    Matches
                </Link>

                {/* Create */}
                <NavDropdown
                    key="create-dropdown"
                    isOpen={this.state.createDropdownOpen}
                    toggle={this.toggleCreateDropdown}>

                    <DropdownToggle nav>Create</DropdownToggle>

                    <DropdownMenu>
                        <DropdownItem header>Create ...</DropdownItem>
                        <DropdownItem>
                            <Link to={adminUrls.leagues.create} className="nav-link">
                                    League
                            </Link>
                        </DropdownItem>
                        <DropdownItem>
                            <Link to={adminUrls.teams.create} className="nav-link">
                                    Team
                            </Link>
                        </DropdownItem>
                        <DropdownItem>
                            <Link to={adminUrls.matches.create} className="nav-link">
                                    Match
                            </Link>
                        </DropdownItem>
                    </DropdownMenu>
                </NavDropdown>
            </Nav>
        );
    }
}

class AdminProfile extends BaseAppProfile {
	items = [LogoutButton]
}

class AdminNavbar extends Appbar {
	itemComponent = AdminNavItems;
	profileComponent = AdminProfile;
}

module.exports = AdminNavbar;

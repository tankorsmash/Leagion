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

class PlayerProfile extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            dropdownOpen: false
        };
    }

    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    render() {
        return (
            <Nav className="ml-auto" navbar>
				<NavDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
					<DropdownToggle nav caret>
						{this.props.user.email}
					</DropdownToggle>
					<DropdownMenu right>
						<DropdownItem tag={AdminButton}></DropdownItem>
						<DropdownItem tag={LogoutButton}></DropdownItem>
					</DropdownMenu>
				</NavDropdown>
            </Nav>
        )
    }
}

class PlayerNavbar extends Navbar {
	itemComponent = PlayerItems;
	profileComponent = PlayerProfile;

}

module.exports = PlayerNavbar;

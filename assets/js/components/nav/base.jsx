import ajax from 'common/ajax';

import {Link} from 'react-router-dom';

import { Collapse, Navbar, NavbarToggler,
    NavbarBrand, NavDropdown, DropdownToggle, DropdownMenu,
    DropdownItem, Nav, NavItem, NavLink
} from 'reactstrap';

import urls from 'common/urls';
import {LogoutButton, LoginButton} from 'components/buttons';
import auth from 'main/auth';

import {NOT_LOADED, DO_NOTHING, STOP_PROPAGATION} from 'common/constants';

class Appbar extends React.Component {
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
                <Navbar className="mb-3" light toggleable>
                    <NavbarBrand href='/'>Leagion</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        {React.createElement(this.itemComponent, this.props)}
                        {React.createElement(this.profileComponent, this.props)}
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}

module.exports = {
    Appbar: Appbar
}

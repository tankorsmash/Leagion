import {Link} from 'react-router-dom';
import { Collapse, Navbar as BSNavbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import urls from 'common/urls';
import {LogoutButton, LoginButton} from 'components/buttons';
import auth from 'main/auth';

class PublicItems extends React.Component {
    render() {
        return (
            <Nav navbar>
                <NavItem>
                </NavItem>
            </Nav>
        )
    }
}

class MainItems extends React.Component {
    render() {
        return (
            <Nav navbar>
                <NavItem>
                </NavItem>
            </Nav>
        )
    }
}

class PublicProfile extends React.Component {
    render() {
        return (
            <LoginButton className="nav-link" />
        )
    }
}

class MainProfile extends React.Component {
    render() {
        return (
            <LogoutButton className="nav-link" />
        )
    }
}

class ProfileButtons extends React.Component {
    render() {
        return (
            <Nav className="ml-auto" navbar>
                <NavItem>
                    {(() => {
                        if (auth.loggedIn()) {
                            return (<MainProfile />);
                        } else {
                            return (<Publicprofile />);
                        }

                    })()}
                </NavItem>
            </Nav>
        )
    }
}



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
                    </Collapse>
                    <ProfileButtons />
                </BSNavbar>
            </div>
        );
    }
}

module.exports = {
    Navbar: Navbar
}

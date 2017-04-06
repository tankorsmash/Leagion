import {Link} from 'react-router-dom';

import { Collapse, Navbar as BSNavbar, NavbarToggler,
    NavbarBrand, NavDropdown, DropdownToggle, DropdownMenu,
    DropdownItem, Nav, NavItem, NavLink
} from 'reactstrap';

import urls from 'common/urls';
import {LogoutButton, LoginButton} from 'components/buttons';
import auth from 'main/auth';

import {LeaguesDropdown} from 'main/app/leagues';

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
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            leagueDropdownOpen: false
        };
    }

    toggle() {
        this.setState({
            leagueDropdownOpen: !this.state.leagueDropdownOpen
        });
    }
    render() {
        let appUrls = urls.app;
        let navUrls = [{
            url: appUrls.teams.index,
            text: "Teams"
        },{
            url: appUrls.matches.index,
            text: "Matches"
        },{
            url: appUrls.matches.create,
            text: "Create Match"
        }];

        return (
            <Nav navbar>
                <NavDropdown isOpen={this.state.leagueDropdownOpen} toggle={this.toggle}>
                    <DropdownToggle nav caret>
                        Leagues
                    </DropdownToggle>
                    <LeaguesDropdown />
                </NavDropdown>
                { navUrls.map((navConf)=>{
                    return (<NavItem>
                        <NavLink tag={Link} to={navConf.url}>{navConf.text}</NavLink>
                    </NavItem>)
                }) }
            </Nav>
        )
    }
}

class ItemButtons extends React.Component {
    render() {
        if (auth.loggedIn()) {
            return (<MainItems />);
        } else {
            return (<PublicItems />);
        }
    }
}

class PublicProfile extends React.Component {
    render() {
        return (
            <NavLink tag={LoginButton} />
        )
    }
}

class MainProfile extends React.Component {
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
            <NavDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                <DropdownToggle nav caret>
                    {localStorage.email}
                </DropdownToggle>
                <DropdownMenu right>
                    <DropdownItem header tag={LogoutButton}>Header</DropdownItem>
                </DropdownMenu>
            </NavDropdown>
        )
    }
}

class ProfileButtons extends React.Component {
    render() {
        return (
            <Nav className="ml-auto" navbar>
                {(() => {
                    if (auth.loggedIn()) {
                        return (<MainProfile />);
                    } else {
                        return (<PublicProfile />);
                    }
                })()}
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
                    <NavbarBrand href={urls.root}>Leagion</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <ItemButtons />
                        <ProfileButtons />
                    </Collapse>
                </BSNavbar>
            </div>
        );
    }
}

module.exports = {
    Navbar: Navbar
}

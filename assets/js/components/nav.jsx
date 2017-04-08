import ajax from 'common/ajax';

import {Link} from 'react-router-dom';

import { Collapse, Navbar as BSNavbar, NavbarToggler,
    NavbarBrand, NavDropdown, DropdownToggle, DropdownMenu,
    DropdownItem, Nav, NavItem, NavLink
} from 'reactstrap';

import urls from 'common/urls';
import {LogoutButton, LoginButton} from 'components/buttons';
import auth from 'main/auth';

import {LeaguesDropdownMenu} from 'main/app/leagues';

const NOT_LOADED = -905639.6421;

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

class ContextDropdownMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {dataset: [] };
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.filterByVal != nextProps.filterByVal) {
            this.updateDataset();
        };
    };

    componentDidMount() {
        this.updateDataset();
    }

    updateDataset() {
        ajax({
            url: reverse(this.props.datasourceUrlName),
        }).then(data => {
            //filter down dataset if {filterByVal} is provided
            if (typeof this.props.filterByVal != "undefined") {
                let fallbackFilter = (obj) => {
                    return obj[this.props.filterByAttr] == this.props.filterByVal;
                };
                data = data.filter(fallbackFilter );
            }

            this.setState({dataset: data});
        });

    };

    render() {
        return (
            <DropdownMenu>
                { this.state.dataset.map((datum, i)=>{
                    let fallbackUpdateFunc = (obj)=>{};
                    let updateFunc = this.props.updateContextFunc || fallbackUpdateFunc;
                    return (
                        <DropdownItem key={i}>
                            <NavLink onClick={()=>{updateFunc(datum)}}>
                                { datum[this.props.nameAttr || "name"] }
                            </NavLink>
                        </DropdownItem>
                    );
                }) }
            </DropdownMenu>
        );
    }
}

class NavContextFilter extends React.Component {
    constructor(props) {
        super(props);

        this.toggleLeagueDropdown = this.toggleLeagueDropdown.bind(this);
        this.toggleTeamDropdown = this.toggleTeamDropdown.bind(this);
        this.toggleMatchDropdown = this.toggleMatchDropdown.bind(this);
        this.toggleCreateDropdown = this.toggleCreateDropdown.bind(this);

        this.state = {
            leagueDropdownOpen: false,
            teamDropdownOpen: false,
            matchDropdownOpen: false,
            createDropdownOpen: false,

            leagueId: localStorage.leagueId || NOT_LOADED,
            teamId: localStorage.teamId || NOT_LOADED,
            matchId: localStorage.matchId || NOT_LOADED,
        };
    }

    toggleLeagueDropdown() {
        this.setState({
            leagueDropdownOpen: !this.state.leagueDropdownOpen
        });
    }

    toggleTeamDropdown() {
        this.setState({
            teamDropdownOpen: !this.state.teamDropdownOpen
        });
    }

    toggleMatchDropdown() {
        this.setState({
            matchDropdownOpen: !this.state.matchDropdownOpen
        });
    }

    toggleCreateDropdown() {
        this.setState({
            createDropdownOpen: !this.state.createDropdownOpen
        });
    }

    updateLeagueId = (league) => {
        this.setState({ leagueId: league.id });
        localStorage.leagueId = league.id;
    }

    updateTeamId = (team) => {
        this.setState({ teamId: team.id });
        localStorage.teamId = team.id;
    }

    updateMatchId = (match) => {
        this.setState({ matchId: match.id });
        localStorage.matchId = match.id;
    }

    render() {
        return (
            <Nav navbar>
                <NavDropdown
                    key="league-dropdown"
                    isOpen={this.state.leagueDropdownOpen}
                    toggle={this.toggleLeagueDropdown}>

                    <DropdownToggle nav >
                        Leagues
                    </DropdownToggle>

                    <ContextDropdownMenu
                        updateContextFunc={this.updateLeagueId}
                        datasourceUrlName="api-league-list"
                    />
                </NavDropdown>

                <NavDropdown
                    className={this.state.leagueId == NOT_LOADED ? "hidden-xs-up" : ""}
                    key="team-dropdown"
                    isOpen={this.state.teamDropdownOpen}
                    toggle={this.toggleTeamDropdown}>

                    <DropdownToggle nav >
                        Teams
                    </DropdownToggle>

                    <ContextDropdownMenu
                        filterByAttr="league"
                        filterByVal={this.state.leagueId}
                        updateContextFunc={this.updateTeamId}
                        datasourceUrlName="api-team-list"
                    />
                </NavDropdown>

                <NavDropdown
                    className={this.state.teamId == NOT_LOADED ? "hidden-xs-up" : ""}
                    key="match-dropdown"
                    isOpen={this.state.matchDropdownOpen}
                    toggle={this.toggleMatchDropdown}>

                    <DropdownToggle nav >
                        Matches
                    </DropdownToggle>

                    <ContextDropdownMenu
                        filterByAttr="away_team"
                        filterByVal={this.state.teamId}
                        updateContextFunc={this.updateMatchId}
                        nameAttr="pretty_name"
                        datasourceUrlName="api-match-list"
                    />
                </NavDropdown>

                <NavDropdown
                    key="create-dropdown"
                    isOpen={this.state.createDropdownOpen}
                    toggle={this.toggleCreateDropdown}>

                    <DropdownToggle nav>
                        Create
                    </DropdownToggle>

                    <DropdownMenu>
                        <DropdownItem header>Create a ...</DropdownItem>
                        <DropdownItem>League</DropdownItem>
                        <DropdownItem>Team</DropdownItem>
                        <DropdownItem>Match</DropdownItem>
                    </DropdownMenu>
                </NavDropdown>
            </Nav>
        );
    }
}

class MainItems extends React.Component {
    render() {
        //TODO: make NavContextFilter not need the toplevel <Nav> inside it. I tried, but if the NavDropdowns arent the first child of Nav, the BS4 styling wont work
        return (
            <div>
                <NavContextFilter />
            </div>
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

        this.toggleLeagueDropdown = this.toggle.bind(this);
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

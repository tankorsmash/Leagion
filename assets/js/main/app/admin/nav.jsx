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

class ContextDropdownMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {dataset: [] };
    }

    componentWillReceiveProps(nextProps) {
        if (true) { //TODO: check nextProps against this.props to see if its actually different
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
            this.setState({dataset: data});
        });

    };

    render() {
        return (
            <DropdownMenu>
                <DropdownItem>
                    <Link to={this.props.detailUrlRoot} className="nav-link">
                            View All
                    </Link>
                </DropdownItem>
                <DropdownItem divider/>

                { this.state.dataset.map((datum, i)=>{
                    let detailUrl = `${this.props.detailUrlRoot}/${datum["id"]}`
                    return (
                        <span key={i}>
                            <DropdownItem>
                                <Link to={detailUrl} className="nav-link">
                                { datum[this.props.nameAttr || "name"] }
                                </Link>
                            </DropdownItem>
                        </span>
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
        this.toggleSeasonDropdown = this.toggleSeasonDropdown.bind(this);
        this.toggleTeamDropdown = this.toggleTeamDropdown.bind(this);
        this.toggleMatchDropdown = this.toggleMatchDropdown.bind(this);
        this.toggleCreateDropdown = this.toggleCreateDropdown.bind(this);

        this.state = {
            leagueDropdownOpen: false,
            seasonDropdownOpen: false,
            teamDropdownOpen: false,
            matchDropdownOpen: false,
            createDropdownOpen: false,

            leagueId: localStorage.leagueId || NOT_LOADED,
            seasonId: localStorage.seasonId || NOT_LOADED,
            teamId: localStorage.teamId || NOT_LOADED,
            matchId: localStorage.matchId || NOT_LOADED,
        };
    }

    toggleLeagueDropdown() {
        this.setState({
            leagueDropdownOpen: !this.state.leagueDropdownOpen
        });
    }

    toggleSeasonDropdown() {
        this.setState({
            seasonDropdownOpen: !this.state.seasonDropdownOpen
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

    render() {
        return (
            <Nav navbar>
                <Link className="nav-link" to={adminUrls.index}> Dashboard </Link>

                {/* Leagues */}
                <NavDropdown
                    key="league-dropdown"
                    isOpen={this.state.leagueDropdownOpen}
                    toggle={this.toggleLeagueDropdown}>

                    <DropdownToggle nav >Leagues</DropdownToggle>

                    <ContextDropdownMenu
                        datasourceUrlName="api-league-list"
                        detailUrlRoot={adminUrls.leagues.index}
                    />
                </NavDropdown>

                {/* Seasons */}
                <NavDropdown
                    key="season-dropdown"
                    isOpen={this.state.seasonDropdownOpen}
                    toggle={this.toggleSeasonDropdown}>

                    <DropdownToggle nav >Seasons</DropdownToggle>

                    <ContextDropdownMenu
                        datasourceUrlName="api-season-list"
                        detailUrlRoot={adminUrls.seasons.index}
                        nameAttr="pretty_name"
                    />
                </NavDropdown>

                {/* Teams */}
                <NavDropdown
                    key="team-dropdown"
                    isOpen={this.state.teamDropdownOpen}
                    toggle={this.toggleTeamDropdown}>

                    <DropdownToggle nav >Teams</DropdownToggle>

                    <ContextDropdownMenu
                        datasourceUrlName="api-team-list"
                        detailUrlRoot={adminUrls.teams.index}
                    />
                </NavDropdown>

                {/* Matches */}
                <NavDropdown
                    key="match-dropdown"
                    isOpen={this.state.matchDropdownOpen}
                    toggle={this.toggleMatchDropdown}>

                    <DropdownToggle nav >Matches</DropdownToggle>

                    <ContextDropdownMenu
                        nameAttr="pretty_name"
                        datasourceUrlName="api-match-list"
                        detailUrlRoot={adminUrls.matches.index}
                    />
                </NavDropdown>

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

class AdminItems extends React.Component {
    render() {
        //TODO: make NavContextFilter not need the toplevel <Nav> inside it. I tried, but if the NavDropdowns arent the first child of Nav, the BS4 styling wont work
        return (
            <div>
                <NavContextFilter />
            </div>
        )
    }
}

class AdminProfile extends BaseAppProfile {
	items = [LogoutButton]
}

class AdminNavbar extends Appbar {
	itemComponent = AdminItems;
	profileComponent = AdminProfile;
}

module.exports = AdminNavbar;

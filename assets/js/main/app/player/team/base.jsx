import {Switch, Link} from 'react-router-dom';
import {Route} from 'components/router';
import SpinLoader from 'components/spinloader';
import {Row, Col} from 'reactstrap';

import seasonUrls from 'main/app/player/season/urls';
import teamUrls from 'main/app/player/team/urls';

import {TeamCard} from 'components/app/team';
import {MatchList} from 'components/app/match';
import {TeamPlayerTable} from 'components/app/player';

import {FourOhFour} from 'components/error-pages';

import ajax from 'common/ajax';

class TeamDetail extends React.Component {
    constructor(props) {
        super(props);

        this.state = { 
            team: {},
            loaded: false
        }; };

    componentDidMount() {
        ajax({
            url: reverse('api-team-detail', {team_id: this.props.match.params.teamId}),
        }).then(data => {
            this.setState({
                team: data,
                loaded: true
            });
        });
    }

    render() {
        return (
            <SpinLoader loaded={this.state.loaded}>
                <Row>
                    <Col md="6">
                        <h5>
                            <Link to={`${seasonUrls.index}/${this.state.team.season}`}>
                                View Season Schedule
                            </Link>
                        </h5>
                        <h5>Matches</h5>
                        <MatchList matches={this.state.team.matches} />
                    </Col>
                    <Col md="6">
                        <h5>Players</h5>
                        <TeamPlayerTable players={this.state.team.players} />
                    </Col>
                </Row>
            </SpinLoader>
        );
    }
}

class TeamList extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = { 
            teams: [],
            loaded: false
        };
    };

    componentDidMount() {
        ajax({
            url: reverse('api-my-team-list'),
        }).then(data => {
            this.setState({
                teams: data,
                loaded: true
            });
        });
    }

    render() {
        return (
            <SpinLoader loaded={this.state.loaded}>
                <div>
                    <h2>My Teams</h2>
                    {this.state.teams.map((team, i) => {
                        return (
                            <Col md="6" key={i}>
                                <TeamCard team={team} />
                            </Col>
                        );
                    })}
                </div>
            </SpinLoader>
        );
    }
}
const LeagueJumbo = (props) => {
	let league = props.league;

	return (
		<Jumbotron>
			<h2>
				<Link to={`${leagueUrls.index}/${league.id}`}>{league.name}</Link>
			</h2>
		</Jumbotron>
	);
};

class Team extends React.Component {

    render() {
        return (
            <Switch>
                <Route exact path={teamUrls.index} component={TeamList} />
                <Route exact path={teamUrls.detail} component={TeamDetail} />
                <Route component={FourOhFour} />
            </Switch>
        );
    }
}

module.exports = {
    Team: Team,
    TeamList: TeamList,
};


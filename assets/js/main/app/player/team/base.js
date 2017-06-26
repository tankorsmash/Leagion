import {Switch, Link} from 'react-router-dom';
import {Route} from 'components/router';
import SpinLoader from 'components/spinloader';
import {Row, Col} from 'reactstrap';

import seasonUrls from 'main/app/player/season/urls';
import teamUrls from 'main/app/player/team/urls';

import {TeamCard} from 'components/app/team';
import {MatchTable} from 'components/app/match';
import {TeamPlayerTable} from 'components/app/player';
import {SeasonLink} from 'components/app/season';
import Titlebar from 'components/app/titlebar';

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
        let season = this.state.team.season || {};
        let league = season.league || {};

        return (
            <SpinLoader loaded={this.state.loaded}>
                <div>
                    <h2>{this.state.team.name}</h2>
                    <h5>{league.name}</h5>
                    <h5>{season.pretty_date}: <SeasonLink id={season.id} text="View Season Schedule"/></h5>
                    <h5>Matches</h5>
                    <MatchTable matches={this.state.team.matches} />
                    <h5>Players</h5>
                    <TeamPlayerTable players={this.state.team.players} />
                </div>
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
    }

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
                <Titlebar title="My Teams" />
                <div className="content team-listing">
                    {this.state.teams.map((team, i) => {
                        return (
                            <TeamCard key={i} team={team} />
                        );
                    })}
                </div>
            </SpinLoader>
        );
    }
}

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


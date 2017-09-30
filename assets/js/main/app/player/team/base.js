import {Switch} from 'react-router-dom';
import {Route} from 'components/router';
import SpinLoader from 'components/spinloader';

import Tabs from 'components/tabs';

import teamUrls from 'main/app/player/team/urls';

import {MatchTable} from 'components/app/match';
import {PlayerAvatarList} from 'components/app/player';
import {TeamCard, TeamTitle} from 'components/app/team';
import Titlebar from 'components/app/titlebar';

import {FourOhFour} from 'components/error-pages';

import ajax from 'common/ajax';

class TeamDetail extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            team: {},
            loaded: false
        };
    }

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
        let tabs = [{
            label: 'Matches',
            content: (<MatchTable matches={this.state.team.matches} />)
        }, {
            label: 'Team Members',
            content: (<PlayerAvatarList size={100} players={this.state.team.players}/>)
        }];

        return (
            <SpinLoader loaded={this.state.loaded}>
                <Titlebar title="My Team" />
                <div className="team-detail-header">
                    <TeamTitle team={this.state.team} />
                </div>
                <Tabs
                    className="team-match-table"
                    tabs={tabs}
                />
            </SpinLoader>
        );
    }
}

export class TeamList extends React.Component {

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

export class Team extends React.Component {

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

import {Switch, Link} from 'react-router-dom';
import {Route} from 'components/router';
import {AsyncBase} from 'components/base';

import playerUrls from 'main/app/player/urls';
import teamUrls from 'main/app/player/team/urls';

import Dashboard from 'main/app/player/dashboard';

import {FourOhFour} from 'components/error-pages';

import ajax from 'common/ajax';

class TeamListItem extends React.Component {
    render() {
        let league = this.props.league;
        return (
            <Link to={`${teamUrls.index}/${team.id}`}>{team.name}</Link>
        );
    }
}

class TeamList extends AsyncBase {
    url = reverse('api-my-team-list');
    state = { leagues: [] };

    getComponent() {
        return (
            <div>
                { this.state.teams.map((team)=>{
                    return <TeamListItem
                        league={team}
                        key={team.id}
                    />
                }) }
            </div>
        );
    }
}

class TeamDetail extends AsyncBase {
    url = reverse('api-my-team-detail');
    state = { team: [] };

    getComponent() {
        return (
            <div>
                { this.state.teams.map((team)=>{
                    return <TeamsListItem
                        league={team}
                        key={team.id}
                    />
                }) }
            </div>
        );
    }
}

class Team extends React.Component {

    render() {
        return (
            <Switch>
                <Route path={TeamUrls.index} component={TeamList} />
                <Route component={FourOhFour} />
            </Switch>
        );
    }
}

module.exports = {
    Team: Team,
    TeamList: TeamList,
};


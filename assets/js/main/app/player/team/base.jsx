import {Switch, Link} from 'react-router-dom';
import {Route} from 'components/router';
import {AsyncBase} from 'components/base';

import playerUrls from 'main/app/player/urls';
import teamUrls from 'main/app/player/team/urls';

import Dashboard from 'main/app/player/dashboard';

import {FourOhFour} from 'components/error-pages';

import ajax from 'common/ajax';

class TeamDetail extends AsyncBase {
    state = { team: {} };

    getUrl() {
        return reverse('api-my-team-detail', {team_id: this.props});
    }

    getComponent() {
        let team = this.state.team;

        return (
            <div>
                <MatchList matches={this.state.team.matches} />
            </div>
        );
    }
}
const what = () => {
    return (<span> hello </span>);
}

class Team extends React.Component {

    //<Route exact path={teamUrls.index} component={TeamList} />
    render() {
        return (
            <Switch>
                <Route path={teamUrls.detail} component={what} />
                <Route component={FourOhFour} />
            </Switch>
        );
    }
}

module.exports = {
    Team: Team,
};


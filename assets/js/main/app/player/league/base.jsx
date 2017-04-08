import {Switch, Link} from 'react-router-dom';
import {Route} from 'components/router';
import {AsyncBase} from 'components/base';

import playerUrls from 'main/app/player/urls';
import leagueUrls from 'main/app/player/league/urls';

import Dashboard from 'main/app/player/dashboard';

import {FourOhFour} from 'components/error-pages';

import ajax from 'common/ajax';

class LeagueListItem extends React.Component {
    render() {
        let league = this.props.league;
        return (
            <Link to={`${leagueUrls.index}/${league.id}`}>{league.name}</Link>
        );
    }
}

class LeagueList extends AsyncBase {
    url = reverse('api-my-league-list');
    state = { leagues: [] };

    getComponent() {
        return (
            <div>
                { this.state.leagues.map((league)=>{
                    return <LeagueListItem
                        league={league}
                        key={league.id}
                    />
                }) }
            </div>
        );
    }

}
class League extends React.Component {

    render() {
        return (
            <Switch>
                <Route path={leagueUrls.index} component={LeagueList} />
                <Route component={FourOhFour} />
            </Switch>
        );
    }
}

module.exports = League;


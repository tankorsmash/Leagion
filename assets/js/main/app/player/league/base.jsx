import {Switch, Link} from 'react-router-dom';
import {Route} from 'components/router';
import {AsyncBase} from 'components/base';

import { Card, CardImg, CardText, CardBlock,
    CardTitle, CardSubtitle, Button, Jumbotron } from 'reactstrap';

import playerUrls from 'main/app/player/urls';
import leagueUrls from 'main/app/player/league/urls';
import teamUrls from 'main/app/player/team/urls';

import Dashboard from 'main/app/player/dashboard';

import {FourOhFour} from 'components/error-pages';

import ajax from 'common/ajax';

class LeagueList extends AsyncBase {
    url = reverse('api-my-league-list');
    state = { leagues: [] };

    getComponent() {
        return (
            <div>
                { this.state.leagues.map((league)=>{
                    return <LeagueCard
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

module.exports = {
    League: League,
    LeagueList: LeagueList,

};


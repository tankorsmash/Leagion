import {Switch} from 'react-router-dom';
import {Route} from 'components/router';

import playerUrls from 'main/app/player/urls';
import leagueUrls from 'main/app/player/urls';

import Dashboard from 'main/app/player/dashboard';
import League from 'main/app/player/league';

import {FourOhFour} from 'components/error-pages';

class League extends React.Component {

    render() {
        return (
            <Switch>
                <Route exact path={playerUrls.index} component={Dashboard} />
                <Route path={leagueUrls.index} component={League} />
                <Route component={FourOhFour} />
            </Switch>
        );
    }
}

module.exports = League;


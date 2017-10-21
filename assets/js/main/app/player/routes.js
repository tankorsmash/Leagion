import {Switch} from 'react-router-dom';
import {Route} from 'components/router';

import PlayerNavbar from 'main/app/player/nav';
import urls from 'main/app/player/urls';

import Dashboard from 'main/app/player/dashboard';
import LeagueRouter from 'main/app/player/league/routes';
import AccountRouter from 'main/app/player/account/routes';
import PlayerProfileRouter from 'main/app/player/profile/routes';
import {FourOhFour} from 'components/error-pages';

export default class Player extends React.Component {

    render() {
        const {setUserState, user} = this.props;
        return (
            <div>
                <PlayerNavbar {...this.props}/>
                <Switch>
                    <Route exact path={urls.index} component={Dashboard} setUserState={setUserState} user={user} />
                    <Route path={urls.leagueIndex} component={LeagueRouter} setUserState={setUserState} user={user} />
                    <Route path={urls.accountIndex} component={AccountRouter} setUserState={setUserState} user={user} />
                    <Route path={urls.profileIndex} component={PlayerProfileRouter} setUserState={setUserState} user={user} />
                    <Route component={FourOhFour} />
                </Switch>
            </div>
        );
    }
}

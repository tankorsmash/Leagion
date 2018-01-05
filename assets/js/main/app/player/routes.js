import {Switch} from 'react-router-dom';
import {Route} from 'components/router';

import PlayerNavbar from 'main/app/player/nav';
import urls from 'main/app/player/urls';
import appUrls from 'main/app/urls';

import Dashboard from 'main/app/player/dashboard';
import LeagueRouter from 'main/app/player/league/routes';
import AccountRouter from 'main/app/account/routes';
import PlayerProfileDetail from 'main/app/player/profile/detail';
import {FourOhFour} from 'components/error-pages';

export default class Player extends React.Component {

    render() {
        const {setUserState, user, constants} = this.props;
        return (
            <div>
                <PlayerNavbar {...this.props}/>
                <Switch>
                    <Route exact path={urls.index} component={Dashboard} setUserState={setUserState} user={user} />
                    <Route path={urls.leagueIndex} component={LeagueRouter} setUserState={setUserState} user={user} constants={constants} />
                    <Route path={appUrls.accountIndex} component={AccountRouter} setUserState={setUserState} user={user} />
                    <Route path={urls.profileDetail} component={PlayerProfileDetail} setUserState={setUserState} user={user} />
                    <Route component={FourOhFour} />
                </Switch>
            </div>
        );
    }
}

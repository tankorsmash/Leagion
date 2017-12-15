import {Switch} from 'react-router-dom';
import {Route} from 'components/router';

import adminUrls from 'main/app/admin/urls';
import appUrls from 'main/app/urls';
import auth from 'main/auth';

import AccountRouter from 'main/app/account/routes';
import AdminNavbar from 'main/app/admin/nav';
import LeagueIndex from 'main/app/admin/league/index';
import LeagueRouter from 'main/app/admin/league/routes';

import {FourOhFour} from 'components/error-pages';

export default class AdminRouter extends React.Component {
    render() {

        const {user, setUserState, changeRole} = this.props;

        if (!(auth.commissionerOrBetter(user))) {
            changeRole('player');
        }
        return (
            <div id="leagion-admin" >
                <AdminNavbar {...this.props} />
                <Switch>
                    <Route exact path={adminUrls.index} component={LeagueIndex} user={user}/>
                    <Route path={adminUrls.leagueIndex} component={LeagueRouter} user={user}/>
                    <Route path={appUrls.accountIndex} component={AccountRouter} setUserState={setUserState} user={user} />
                    <Route component={FourOhFour} />
                </Switch>
            </div>
        );
    }
}

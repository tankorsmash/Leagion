import {Switch} from 'react-router-dom';
import {Route} from 'components/router';

import urls from 'main/app/admin/urls';
import {FourOhFour} from 'components/error-pages';

import LeagueIndex from 'main/app/admin/league/index';
import SeasonRouter from 'main/app/admin/league/season/routes';

export default class LeagueRouter extends React.Component {

    render() {
        const {setUserState, user, constants} = this.props;
        return (
            <Switch>
                <Route exact path={urls.leagueIndex} component={LeagueIndex} setUserState={setUserState} user={user} />
                <Route path={urls.seasonIndex} component={SeasonRouter} setUserState={setUserState} user={user} constants={constants} />
                <Route component={FourOhFour} />
            </Switch>
        );
    }
}

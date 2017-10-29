import {Switch} from 'react-router-dom';
import {Route} from 'components/router';

import urls from 'main/app/player/urls';
import {FourOhFour} from 'components/error-pages';

import LeagueDetail from 'main/app/player/league/detail';
import SeasonRouter from 'main/app/player/league/season/routes';

export default class LeagueRouter extends React.Component {

    render() {
        const {setUserState, user, constants} = this.props;
        return (
            <Switch>
                <Route exact path={urls.leagueDetail} component={LeagueDetail} setUserState={setUserState} user={user} />
                <Route path={urls.seasonIndex} component={SeasonRouter} setUserState={setUserState} user={user} constants={constants} />
                <Route component={FourOhFour} />
            </Switch>
        );
    }
}

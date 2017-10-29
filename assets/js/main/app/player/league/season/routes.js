import {Switch} from 'react-router-dom';
import {Route} from 'components/router';
import urls from 'main/app/player/urls';

import {FourOhFour} from 'components/error-pages';

import SeasonDetail from 'main/app/player/league/season/detail';
import TeamRouter from 'main/app/player/league/season/team/routes';
import MatchRouter from 'main/app/player/league/season/match/routes';

export default class SeasonRouter extends React.Component {

    render() {
        const {setUserState, user, constants} = this.props;
        return (
            <Switch>
                <Route exact path={urls.seasonDetail} component={SeasonDetail} setUserState={setUserState} user={user} />
                <Route path={urls.teamIndex} component={TeamRouter} setUserState={setUserState} user={user} constants={constants} />
                <Route path={urls.matchIndex} component={MatchRouter} setUserState={setUserState} user={user} />
                <Route component={FourOhFour} />
            </Switch>
        );
    }
}

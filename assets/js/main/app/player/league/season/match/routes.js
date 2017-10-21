import {Switch} from 'react-router-dom';
import {Route} from 'components/router';

import urls from 'main/app/player/urls';
import {FourOhFour} from 'components/error-pages';

import MatchDetail from 'main/app/player/league/season/match/detail';

export default class MatchRouter extends React.Component {
    render() {
        const {setUserState, user} = this.props;
        return (
            <Switch>
                <Route exact path={urls.matchDetail} component={MatchDetail} setUserState={setUserState} user={user} />
                <Route component={FourOhFour} />
            </Switch>
        );
    }
}

import {Switch} from 'react-router-dom';
import {Route} from 'components/router';

import urls from 'main/app/player/urls';
import {FourOhFour} from 'components/error-pages';

import TeamIndex from 'main/app/player/league/season/team/index';
import TeamDetail from 'main/app/player/league/season/team/detail';

export default class TeamRouter extends React.Component {

    render() {
        const {setUserState, user} = this.props;
        return (
            <Switch>
                <Route exact path={urls.teamIndex} component={TeamIndex} setUserState={setUserState} user={user} />
                <Route path={urls.teamDetail} component={TeamDetail} setUserState={setUserState} user={user} />
                <Route component={FourOhFour} />
            </Switch>
        );
    }
}

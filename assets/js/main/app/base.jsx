import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {Container, Row, Col} from 'reactstrap';

import ajax from 'common/ajax';
import appUrls from 'main/app/urls';
import adminUrls from 'main/app/admin/urls';
import playerUrls from 'main/app/player/urls';
import {NOT_LOADED} from 'common/constants';

import auth from 'main/auth';

import Leagues from 'main/app/components/leagues';
import Teams from 'main/app/components/teams';
import Matches from 'main/app/components/matches';

import {FourOhFour} from 'components/error-pages';

import Admin from 'main/app/admin/base';
import Player from 'main/app/player/base';

class App extends React.Component {
    componentDidMount() {
        this.loadUserData();
    }

    loadUserData() {
        ajax({
            url: reverse('rest_user_details'),
        }).then(data => {
            localStorage.id = data.id;
            localStorage.email = data.email;
            localStorage.name = data.name;
        });
    }

    render() {
        return (
            <Switch>
                <Route exact path={appUrls.index} component={Player} />
                <Route path={adminUrls.index} component={Admin} />
                <Route path={playerUrls.index} component={Player} />
                <Route component={FourOhFour} />
            </Switch>
        );
    }
}

module.exports = App;

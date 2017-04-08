import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {Container, Row, Col} from 'reactstrap';

import ajax from 'common/ajax';
import appUrls from 'main/app/urls';
import adminUrls from 'main/app/admin/urls';
import playerUrls from 'main/app/player/urls';
import {NOT_LOADED} from 'common/constants';

import auth from 'main/auth';

import Dashboard from 'main/app/player/dashboard';
import Leagues from 'main/app/components/leagues';
import Teams from 'main/app/components/teams';
import Matches from 'main/app/components/matches';

import {FourOhFour} from 'components/error-pages';

import Admin from 'main/app/admin/base'
import Player from 'main/app/player/base'
import AdminNavbar from 'components/nav/admin';

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
        console.log(adminUrls.index);
        return (
            <div>
                <AdminNavbar/>
                <Container>
                    <Row>
                        <Col>
                            <main>
                                <Switch>
                                    <Route exact path={appUrls.index} component={Dashboard} />
                                    <Route path={adminUrls.index} component={Admin} />
                                    <Route path={playerUrls.index} component={Player} />
                                    <Route component={FourOhFour} />
                                </Switch>
                            </main>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

module.exports = App;

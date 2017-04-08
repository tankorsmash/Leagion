import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {Container, Row, Col} from 'reactstrap';

import ajax from 'common/ajax';
import urls from 'common/urls';
import {NOT_LOADED} from 'common/constants';

import auth from 'main/auth';

import Dashboard from 'main/app/player/dashboard';
import Leagues from 'main/app/components/leagues';
import Teams from 'main/app/components/teams';
import Matches from 'main/app/components/matches';

import {FourOhFour} from 'components/error-pages';

import AdminNavbar from 'components/nav/admin';

class Admin extends React.Component {
    render() {
        return (
            <div>
                <AdminNavbar/>
                <Container>
                    <Row>
                        <Col>
                            <main>
                                <Switch>
                                    <Route exact path={urls.app.admin.index} component={Dashboard} />
                                    <Route path={urls.app.admin.leagues.detail} component={Leagues} />
                                    <Route path={urls.app.admin.teams.detail} component={Teams} />
                                    <Route path={urls.app.admin.matches.detail} component={Matches} />
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

module.exports = Admin;

import {BrowserRouter as Router, Switch} from 'react-router-dom';
import {Route} from 'components/router';

import {Container, Row, Col} from 'reactstrap';

import ajax from 'common/ajax';
import adminUrls from 'main/app/admin/urls';
import {NOT_LOADED} from 'common/constants';

import auth from 'main/auth';

import Dashboard from 'main/app/admin/dashboard';
import Leagues from 'main/app/components/leagues';
import Teams from 'main/app/components/teams';
import Matches from 'main/app/components/matches';

import {FourOhFour} from 'components/error-pages';

import AdminNavbar from 'main/app/admin/nav';

class Admin extends React.Component {
    render() {
        return (
            <div>
                <AdminNavbar {...this.props} />
                <Container>
                    <Row>
                        <Col>
                            <main>
                                <Switch>
                                    <Route exact path={adminUrls.index} component={Dashboard} />
                                    <Route path={adminUrls.leagues.detail} component={Leagues} />
                                    <Route path={adminUrls.teams.detail} component={Teams} />
                                    <Route path={adminUrls.matches.detail} component={Matches} />
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

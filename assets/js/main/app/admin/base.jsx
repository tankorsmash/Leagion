import {Switch} from 'react-router-dom';
import {Route} from 'components/router';

import {Container, Row, Col} from 'reactstrap';

import adminUrls from 'main/app/admin/urls';

import AdminNavbar from 'main/app/admin/nav';
import Dashboard from 'main/app/admin/dashboard';
import Leagues from 'main/app/components/leagues';
import Teams from 'main/app/components/teams';
import Matches from 'main/app/components/matches';

import {FourOhFour} from 'components/error-pages';


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
                                    <Route exact path={adminUrls.index} {...this.props} component={Dashboard} />
                                    <Route path={adminUrls.leagues.detail} {...this.props} component={Leagues} />
                                    <Route path={adminUrls.teams.detail} {...this.props} component={Teams} />
                                    <Route path={adminUrls.matches.detail} {...this.props} component={Matches} />
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

import {Switch} from 'react-router-dom';
import {Route} from 'components/router';

import {Container, Row, Col} from 'reactstrap';

import adminUrls from 'main/app/admin/urls';

import AdminNavbar from 'main/app/admin/nav';
import Dashboard from 'main/app/admin/dashboard';
import Leagues from 'main/app/admin/components/leagues';
import Seasons from 'main/app/admin/components/seasons';
import Teams from 'main/app/admin/components/teams';
import Matches from 'main/app/admin/components/matches';

import {FourOhFour} from 'components/error-pages';


class Admin extends React.Component {
    render() {
        return (
            <div>
                <AdminNavbar {...this.props} />
                <Container>
                    <Row>
                        <Col>
                            <Switch>
                                <Route exact path={adminUrls.index}  component={Dashboard} />
                                <Route path={adminUrls.leagues.detail}  component={Leagues} />
                                <Route path={adminUrls.seasons.detail}  component={Seasons} />
                                <Route path={adminUrls.teams.detail}  component={Teams} />
                                <Route path={adminUrls.matches.detail}  component={Matches} />
                                <Route component={FourOhFour} />
                            </Switch>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

module.exports = Admin;

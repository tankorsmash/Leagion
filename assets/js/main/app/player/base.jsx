import {BrowserRouter as Router, Switch} from 'react-router-dom';
import {Route} from 'components/router';

import {Container, Row, Col} from 'reactstrap';

import ajax from 'common/ajax';
import playerUrls from 'main/app/player/urls';
import {NOT_LOADED} from 'common/constants';

import auth from 'main/auth';

import Dashboard from 'main/app/player/dashboard';
import Leagues from 'main/app/components/leagues';
import Teams from 'main/app/components/teams';
import Matches from 'main/app/components/matches';

import {FourOhFour} from 'components/error-pages';

import PlayerNavbar from 'main/app/player/nav';

class Player extends React.Component {

    render() {
        return (
            <div>
                <PlayerNavbar {...this.props}/>
                <Container>
                    <Row>
                        <Col>
                            <main>
                                <Switch>
                                    <Route exact path={playerUrls.index} component={Dashboard} />
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

module.exports = Player;

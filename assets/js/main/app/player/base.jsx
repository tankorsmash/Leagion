import {Switch} from 'react-router-dom';
import {Route} from 'components/router';

import {Container, Row, Col} from 'reactstrap';

import PlayerNavbar from 'main/app/player/nav';
import playerUrls from 'main/app/player/urls';

import Dashboard from 'main/app/player/dashboard';
import League from 'main/app/player/league/base';
import {FourOhFour} from 'components/error-pages';

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
                                    <Route path={leagueUrls.index} component={League} />
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

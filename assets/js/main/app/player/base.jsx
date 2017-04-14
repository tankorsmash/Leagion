import {Switch} from 'react-router-dom';
import {Route} from 'components/router';

import {Container, Row, Col} from 'reactstrap';
import {Appbar} from 'components/nav/base';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

import PlayerDrawerItems from 'main/app/player/nav';
import playerUrls from 'main/app/player/urls';
import leagueUrls from 'main/app/player/league/urls';
import seasonUrls from 'main/app/player/season/urls';
import teamUrls from 'main/app/player/team/urls';
import matchUrls from 'main/app/player/match/urls';

import Dashboard from 'main/app/player/dashboard';
import {League} from 'main/app/player/league/base';
import {Season} from 'main/app/player/season/base';
import {Team} from 'main/app/player/team/base';
import {Match} from 'main/app/player/match/base';
import {FourOhFour} from 'components/error-pages';

class Player extends React.Component {

    render() {
        return (
            <div>
                <Appbar>
					<PlayerDrawerItems/>
				</Appbar>
                <Container>
                    <Row>
                        <Col>
                            <main>
                                <Switch>
                                    <Route exact path={playerUrls.index} component={Dashboard} />
                                    <Route path={leagueUrls.index} component={League} />
                                    <Route path={teamUrls.index} component={Team} />
                                    <Route path={seasonUrls.index} component={Season} />
                                    <Route path={matchUrls.index} component={Match} />
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

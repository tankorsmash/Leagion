import Spinner from 'react-spinkit';
import {
    Container, Row, Col, Jumbotron, Button,
    Card, CardImg, CardText, CardBlock, CardTitle, CardSubtitle,
    Nav, NavLink, NavItem
} from 'reactstrap';
import {Switch, Link, Redirect, NavLink as RouterNavLink} from 'react-router-dom';
import {Route} from 'components/router';

import {buildPageTitle} from 'common/utils';

import DatasetView from 'components/dataset_view';

import {OverviewPane} from 'main/app/admin/dashboard/overview_pane';
import {LeaguesPane} from 'main/app/admin/dashboard/leagues_pane';
import {TeamsPane} from 'main/app/admin/dashboard/teams_pane';
import {PlayersPane} from 'main/app/admin/dashboard/players_pane';
import {LocationsPane} from 'main/app/admin/dashboard/locations_pane';

import adminUrls from 'main/app/admin/urls';


export default class Dashboard extends React.Component {
    constructor(props) {
        super(props);

        this.tabs = [{
            'id': 'overview',
            'name': 'Overview',
            'pane': OverviewPane,
        },{
            'id': 'leagues',
            'name': 'Leagues',
            'pane': LeaguesPane,
        },{
            'id': 'teams',
            'name': 'Teams',
            'pane': TeamsPane,
        },{
            'id': 'players',
            'name': 'Players',
            'pane': PlayersPane,
        },{
            'id': 'locations',
            'name': 'Locations',
            'pane': LocationsPane,
        },];

    };


    buildUrlFromId(id) {
        return `${adminUrls.dashboard.index}/${id}`;
    }

    render() {
        buildPageTitle("Admin Dashboard");
        return (
            <Container fluid>
                <Row>
                    <Col className="bg-faded pt-3" sm="2">
                        <Nav pills vertical>
                            { this.tabs.map((tab) => {
                                return (
                                    <NavItem key={tab.id} >
                                        <RouterNavLink to={this.buildUrlFromId(tab.id)} className="nav-link" activeClassName="active">
                                            {tab.name}
                                        </RouterNavLink>
                                    </NavItem>
                                );
                            })}
                        </Nav>
                    </Col>
                    <Col className="pt-3" sm="10">
                        <Switch>
                            { this.tabs.map((tab) => {
                                return (
                                    <Route key={tab.id} path={this.buildUrlFromId(tab.id)} component={tab.pane} />
                                );
                            })}

                            {/* fallback to overview if provided garbage tab name */}
                            <Redirect from={adminUrls.dashboard.index} to={adminUrls.dashboard.overview} />
                        </Switch>

                    </Col>
                </Row>
            </Container>
        );
    }
}

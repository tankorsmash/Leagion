import Spinner from 'react-spinkit';
import {
    Container, Row, Col, Jumbotron, Button,
    Card, CardImg, CardText, CardBlock, CardTitle, CardSubtitle,
    Nav, NavLink, NavItem
} from 'reactstrap';
import {Switch, Link, Redirect} from 'react-router-dom';
import {Route} from 'components/router';

import {buildPageTitle} from 'common/utils';

import {DatasetView} from 'components/dataset_view';

import {OverviewPane} from 'main/app/admin/dashboard/overview_pane';
import {LeaguesPane} from 'main/app/admin/dashboard/leagues_pane';

import adminUrls from 'main/app/admin/urls';


class TeamsPane extends React.Component {
    render() {
        return (
            <div> TeamsPane </div>
        );
    };
};

class Dashboard extends React.Component {
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
        },];

    };


    buildUrlFromId(id) {
        return `${adminUrls.dashboard.index}/${id}`;
    }

    _renderTabs(){
        const navItems = this.tabs.map((tab)=>{
            const matchesUrl = window.location.pathname==this.buildUrlFromId(tab.id);
            return (
                <NavItem key={tab.id} >
                    <NavLink tag={Link} to={this.buildUrlFromId(tab.id)} active={matchesUrl}>
                        {tab.name}
                    </NavLink>
                </NavItem>
            );
        });

        return (
            <Nav pills vertical>
                { navItems }
            </Nav>
        );
    }

    render() {
        buildPageTitle("Admin Dashboard");
        return (
            <Container fluid>
                <Row>
                    <Col className="bg-faded" sm="2">
                        { this._renderTabs() }
                    </Col>
                    <Col sm="10">
                        <Switch>
                            {
                                this.tabs.map((tab) => {
                                    return <Route key={tab.id} path={this.buildUrlFromId(tab.id)} component={tab.pane} />
                                })
                            }

                            {/* fallback to overview if provided garbage tab name */}
                            <Redirect from={adminUrls.dashboard.index} to={adminUrls.dashboard.overview} />
                        </Switch>

                    </Col>
                </Row>
            </Container>
        );
    }
}

module.exports = Dashboard;

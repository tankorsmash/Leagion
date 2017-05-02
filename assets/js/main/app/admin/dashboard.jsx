import Spinner from 'react-spinkit';
import {
    Container, Row, Col, Jumbotron, Button,
    Card, CardImg, CardText, CardBlock, CardTitle, CardSubtitle,
    Nav, NavLink, NavItem
} from 'reactstrap';
import {Link, Redirect} from 'react-router-dom';

import {buildPageTitle} from 'common/utils';

import {DatasetView} from 'components/dataset_view';

import {OverviewPane} from 'main/app/admin/dashboard/overview_pane';
import {LeaguesPane} from 'main/app/admin/dashboard/leagues_pane';


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
        this.state = {
            activeTabId: 'overview',
        };

        this.tabs = [{
            'id': 'overview',
            'name': 'Overview',
            'pane': <OverviewPane/>,
        },{
            'id': 'leagues',
            'name': 'Leagues',
            'pane': <LeaguesPane/>,
        },{
            'id': 'teams',
            'name': 'Teams',
            'pane': <TeamsPane/>,
        },];
    };

    setActiveTabId(tabId){
        this.setState({
            activeTabId: tabId,
        });
    }

    _renderTabs(){
        const navItems = this.tabs.map((tab)=>{
            return (
                <NavItem onClick={(e)=>{this.setActiveTabId(tab.id)}} key={tab.id} >
                    <NavLink href="#" key={tab.id} active={tab.id==this.state.activeTabId}>
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

    _renderActivePane(){
        const activeTab = this.tabs.filter((tab)=>{
            return tab.id === this.state.activeTabId;
        });

        //assume only one match
        return activeTab[0].pane;
    }

    render() {
        buildPageTitle("Admin Dashboard");

        return (
            <Container fluid>
                <Row>
                    <Col className="bg-faded" sm="2">
                        {this._renderTabs()}
                    </Col>
                    <Col sm="10">
                        {this._renderActivePane()}
                    </Col>
                </Row>
            </Container>
        );
    }
}

module.exports = Dashboard;

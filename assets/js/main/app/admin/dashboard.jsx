import {
    Container, Row, Col, Jumbotron, Button,
    Card, CardImg, CardText, CardBlock, CardTitle, CardSubtitle,
    Nav, NavLink, NavItem
} from 'reactstrap';
import {Link, Redirect} from 'react-router-dom';

import ajax from 'common/ajax';
import adminUrls from 'main/app/admin/urls';

import {buildPageTitle} from 'common/utils';

import {AsyncBase} from 'components/base';

class LeagueCard extends React.Component {
    constructor(props) {
        super(props);
    };

    render() {
        return (
            <Card>
                <CardImg top src={`https://placeholdit.imgix.net/~text?txtsize=33&txt=${this.props.league.name}&w=318&h=180`} alt="Card image cap" />
                <CardBlock>
                    <CardTitle>{this.props.league.name}</CardTitle>
                    <CardSubtitle>Sport type?</CardSubtitle>
                    <CardText>I dunno, some hardcoded details about the league, maybe its team count or something.</CardText>
                    <Link to={`${adminUrls.leagues.index}/${this.props.league.id}`}>
                        <Button>
                            View
                        </Button>
                    </Link>
                </CardBlock>
            </Card>
        );
    }
};


class ContentHeader extends React.Component {
    render() {
        return (
            <div>
                <Jumbotron>
                    <h1 className="display-3">Dashboard</h1>
                    <p className="lead">Overview of the league management</p>
                    <hr className="my-2" />
                    <p>As a league manager, you're able to view all teams and players.
                        You'll be able to create and edit teams,
                        assign coaches and team managers, and set up schedules.</p>
                    <p className="lead">
                        <Button color="primary">Learn More</Button>
                    </p>
                </Jumbotron>
            </div>
        );
    }
};

class MainContent extends React.Component {
    render() {
        return (
            <div>
                <ContentHeader/>
            </div>
        );
    }
};

class OverviewPane extends React.Component {
    render() {
        return (
            <div> <ContentHeader/> </div>
        );
    };
};

class LeaguesPane extends React.Component {
    render() {
        return (
            <div> LeaguesPane </div>
        );
    };
};

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
                    <Col className="bg-faded" sm="3">
                        {this._renderTabs()}
                    </Col>
                    <Col sm="9">
                        {this._renderActivePane()}
                    </Col>
                </Row>
            </Container>
        );
    }
}

module.exports = Dashboard;

import Spinner from 'react-spinkit';
import {
    Container, Row, Col, Jumbotron, Button,
    Card, CardImg, CardText, CardBlock, CardTitle, CardSubtitle,
    Nav, NavLink, NavItem
} from 'reactstrap';
import {Link, Redirect} from 'react-router-dom';

import ajax from 'common/ajax';
import adminUrls from 'main/app/admin/urls';

import {buildPageTitle} from 'common/utils';

import {DatasetView} from 'components/dataset_view';

import {OverviewPane} from 'main/app/admin/dashboard/overview_pane';

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


class LeaguesPane extends DatasetView {
    get datasetStateAttr() {
        return "leagues";
    };

    get datasetViewName() {
        return "api-league-list";
    }

    render() {
        if (this.getIsLoaded() == false) {
            return (<Spinner spinnerName='three-bounce' />);
        } else {
            const leagueList = this.state.leagues.map((league) => {
                return <LeagueCard league={league} />;
            });

            let rows = [];
            for (let i = 0; i <= leagueList.length; i+=3) {
                rows.push(
                    <Row key={i}>
                        <Col md="4"> {leagueList[i]} </Col>
                        <Col md="4"> {leagueList[i+1]} </Col>
                        <Col md="4"> {leagueList[i+2]} </Col>
                    </Row>
                );
            };

            return (
                <div>
                    <h3> Leagues </h3>
                    { rows }
                </div>
            );
        }
    }
}


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

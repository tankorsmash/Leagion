import {
    Container, Row, Col, Jumbotron, Button,
    Card, CardImg, CardText, CardBlock, CardTitle, CardSubtitle
} from 'reactstrap';

import ajax from 'common/ajax';

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
                    <Button>Detail?</Button>
                </CardBlock>
            </Card>
        );
    }
};

class LeftBar extends AsyncBase {
    constructor(props) {
        super(props);

        this.state['leagues'] = [];
    };

    componentDidMount() {
        ajax({
            url: reverse('api-league-list'),
        }).then(data => {
            this.setState({leagues: data});
            this.loaded();
        });
    }

    getComponent() {
        return (
            <div>
                {this.state.leagues.map((league)=>{
                    return (<LeagueCard key={league.id} league={league} />);
                })}
            </div>
        )
    }
}


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


class Dashboard extends React.Component {
    render() {
        buildPageTitle("Admin Dashboard");

        return (
            <Row>
                <Col sm="4"><LeftBar/></Col>
                <Col sm="8"><MainContent/></Col>
            </Row>
        );
    }
}

module.exports = Dashboard;

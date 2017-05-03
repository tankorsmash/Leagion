import Spinner from 'react-spinkit';
import {
    Container, Row, Col, Jumbotron, Button,
    Card, CardImg, CardText, CardBlock, CardTitle, CardSubtitle,
    Nav, NavLink, NavItem
} from 'reactstrap';

import {Link, Redirect} from 'react-router-dom';
import {DatasetView} from 'components/dataset_view';

import adminUrls from 'main/app/admin/urls';

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


export class LeaguesPane extends DatasetView {
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
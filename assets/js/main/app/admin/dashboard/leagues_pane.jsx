import Spinner from 'react-spinkit';
import {
    Container, Row, Col, Jumbotron, Button,
    Card, CardImg, CardText, CardBlock, CardTitle, CardSubtitle,
    Nav, NavLink, NavItem, Table
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

function buildLeagueCards(leagues) {
    const leagueList = leagues.map((league) => {
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

    return rows;
};

class TableHead extends React.Component {
    render() {
        return (
            <thead>
                <tr>
                    {
                        this.props.columns.map((column, i) => {
                            return (<th key={i+1}> {column.title} </th>);
                        })
                    }
                </tr>
            </thead>
        );
    };
}

class SeasonCell extends React.Component {
    render() {
        const league = this.props.data;
        return (
            <td> {league.seasons.length}</td>
        );
    }
}

class LeaguesTable extends React.Component {
    renderCell(index, column, league) {
        //if there's a component to render, use that, otherwise build a plain <td>
        if (column.component) {
            const CellComponent = column.component;
            return (
                <CellComponent key={index} data={league} />
            );
        } else {
            return (
                <td key={index}> {league[column.id]} </td>
            );
        };
    }

    render() {
        let columns = [{
            id: "id",
            title: "ID",
        },{
            id: "name",
            title: "Name",
        },{
            id: "seasons",
            title: "Seasons",
            component: SeasonCell,
        }];

        const leagues = this.props.leagues;

        return (
            <Table striped>
                <TableHead columns={columns}/>
                <tbody>
                    {
                        leagues.map((league, i) => {
                            return (
                                <tr key={i}>
                                    {
                                        columns.map((column, i) => {
                                            return this.renderCell(i, column, league);
                                        })
                                    }
                                </tr>
                            );
                        })
                    }
                </tbody>
            </Table>
        );
    };
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
            // let content = buildLeagueCards(this.state.leagues);
            let content = <LeaguesTable leagues={this.state.leagues} />;
            return (
                <div>
                    <h3> Leagues </h3>
                    { content }
                </div>
            );
        }
    }
}

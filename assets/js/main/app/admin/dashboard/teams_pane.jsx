import Spinner from 'react-spinkit';
import {
    Container, Row, Col, Jumbotron, Button,
    Card, CardImg, CardText, CardBlock, CardTitle, CardSubtitle,
    Nav, NavLink, NavItem, Table
} from 'reactstrap';

import {Link, Redirect} from 'react-router-dom';
import {DatasetView} from 'components/dataset_view';
import {GeneralTable} from 'main/app/admin/components/table'

import adminUrls from 'main/app/admin/urls';

class MatchesCell extends React.Component {
    render() {
        const team = this.props.data;
        return (
            <td> {team.matches.length}</td>
        );
    }
}

class PlayersCell extends React.Component {
    render() {
        const team = this.props.data;
        return (
            <td> {team.players.length}</td>
        );
    }
}


export class TeamsPane extends DatasetView {
    get datasetStateAttr() {
        return "teams";
    };

    get datasetViewName() {
        return "api-team-list";
    }

    render() {
        if (this.getIsLoaded() == false) {
            return (<Spinner spinnerName='three-bounce' />);
        }

        let columns = [{
            id: "id",
            title: "ID",
        },{
            id: "name",
            title: "Name",
        },{
            id: "matches",
            title: "Matches",
            component: MatchesCell,
        },{
            id: "players",
            title: "Players",
            component: PlayersCell,
        }];

        return (
            <div>
                <h3> Teams </h3>
                <GeneralTable columns={columns} rowData={this.state.teams} />
            </div>
        );
    }
}

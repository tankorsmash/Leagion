import Spinner from 'react-spinkit';
import {
    Container, Row, Col, Jumbotron, Button,
    Card, CardImg, CardText, CardBlock, CardTitle, CardSubtitle,
    Nav, NavLink, NavItem, Table, Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle,
    Form, FormGroup, Input, Dropdown, Label,
} from 'reactstrap';

import {Link, Redirect} from 'react-router-dom';
import {GeneralTable} from 'main/app/admin/components/table'
import TeamCreateForm from 'main/app/admin/dashboard/create-team-form'

import DatasetView from 'components/dataset_view';
import FormModal from 'components/form_modal';

import adminUrls from 'main/app/admin/urls';
import pathToRegex from 'path-to-regexp';

class TeamsCell extends React.Component {
    render() {
        const team = this.props.data;
        const teamUrlizer = pathToRegex.compile(adminUrls.teams.detail);
        return (
            <td>
                <Link to={teamUrlizer({teamId: team.id})}>
                    {team.name}
                </Link>
            </td>
        );
    }
}

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
        let columns = [{
            id: "name",
            title: "Name",
            component: TeamsCell,
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
                <Row>
                    <Col> <h3> Teams </h3> </Col>
                    <Col className="" md="2">
                        <FormModal
                            formComponent={TeamCreateForm}
                            formData={{"name": "", "season_id": -1, "leagueId": -1}}
                            postUrl={reverse("api-team-list")}
                            triggerRefreshOnGrid={this.updateDataset}
                            buttonLabel="Create" />
                    </Col>
                </Row>
                <GeneralTable columns={columns} rowData={this.state.teams} />
            </div>
        );
    }
}

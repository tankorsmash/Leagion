import Spinner from 'react-spinkit';
import {
    Container, Row, Col, Jumbotron, Button,
    Card, CardImg, CardText, CardBlock, CardTitle, CardSubtitle,
    Nav, NavLink, NavItem, Table, Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle,
    Form, FormGroup, Input, Label,
} from 'reactstrap';

import {Link, Redirect} from 'react-router-dom';
import {GeneralTable} from 'main/app/admin/components/table'

import {DatasetView} from 'components/dataset_view';
import {FormBase} from 'components/forms';

import ajax from 'common/ajax';

import adminUrls from 'main/app/admin/urls';
import pathToRegex from 'path-to-regexp';

class CreateTeamModal extends FormBase {
    constructor(props) {
        super(props);
        this.state = {
            'modal': false,
            'name': '',
            'created': false,
        };

        this.toggle = this.toggle.bind(this);
    }

    handleSubmit = (e) => {
        e.preventDefault();

        ajax({
            url:reverse('api-team-list'),
            method: 'POST',
            data: {
                name: this.state.name,
            }
        }).then(data => {
            let redirectUrl = this.props.redirectUrl;
            this.setState({
                'created': true,
                'redirectUrl': redirectUrl,
                'modal': false,
            });

            toastr.success("Team Created!");
            //regenerate season grid in league detail
            if (this.props.triggerRefreshOnGrid !== undefined) {
                this.props.triggerRefreshOnGrid();
            };

        }, error => {
            console.log("failed:", error);
            this.setState({'created': false});
        });
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    render() {
        return (
            <div>
                <Button color="primary" onClick={this.toggle}>{this.props.buttonLabel}</Button>

                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Create Team</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleSubmit} >
                            <FormGroup>
                                <Label for="name">Team name:</Label>
                                <Input onChange={this.handleInputChange} value={this.state.name} type="text" name="name" id="name" placeholder="Sports Team Three"/>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.handleSubmit}>Create!</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}


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
                <h3> Teams </h3>
                <Col className="ml-auto" md="2">
                    <CreateTeamModal triggerRefreshOnGrid={this.updateDataset} buttonLabel="Create" />
                </Col>
                <GeneralTable columns={columns} rowData={this.state.teams} />
            </div>
        );
    }
}

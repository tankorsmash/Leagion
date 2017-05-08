import Spinner from 'react-spinkit';
import {
    Button, Card, CardBlock, CardImg, CardSubtitle, CardText, CardTitle,
    Col, Container, DropdownItem, DropdownMenu, Form, FormGroup, Input,
    Jumbotron, Label, Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle,
    Nav, NavItem, NavLink, Row, Table,
} from 'reactstrap';

import {Link, Redirect} from 'react-router-dom';
import {DatasetView} from 'components/dataset_view';
import {GeneralTable} from 'main/app/admin/components/table'

import ajax from 'common/ajax';

import adminUrls from 'main/app/admin/urls';
import pathToRegex from 'path-to-regexp';

import {FormBase} from 'components/forms';

class SeasonCell extends React.Component {
    render() {
        const league = this.props.data;
        return (
            <td> {league.seasons.length}</td>
        );
    }
}

class LeagueNameCell extends React.Component {
    render() {
        const league = this.props.data;
        const url = pathToRegex.compile(adminUrls.leagues.detail)({leagueId:league.id});
        return (
            <td> <Link to={url}>{league.name}</Link></td>
        );
    }
}

class CreateLeagueModal extends FormBase {
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
            url:reverse('api-league-list'),
            method: 'POST',
            data: {
                name: this.state.name,
            }
        }).then(data => {
            let redirectUrl = this.props.redirectUrl; //adminUrls.seasons.index+'/'+data.id;
            this.setState({
                'created': true,
                'redirectUrl': redirectUrl,
                'modal': false,
            });

            toastr.success("League Created!");
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
                    <ModalHeader toggle={this.toggle}>Create League</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleSubmit} >
                            <FormGroup>
                                <Label for="name">League name:</Label>
                                <Input onChange={this.handleInputChange} value={this.state.name} type="text" name="name" id="name" placeholder="Peewee League"/>
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

export class LeaguesPane extends DatasetView {
    get datasetStateAttr() {
        return "leagues";
    };

    get datasetViewName() {
        return "api-league-list";
    }

    render() {
        let columns = [{
            id: "id",
            title: "ID",
        },{
            id: "name",
            title: "Name",
            component: LeagueNameCell,
        },{
            id: "seasons",
            title: "Seasons",
            component: SeasonCell,
        }];

        return (
            <div>
                <Row>
                    <Col md="6"> <h3> Leagues </h3> </Col>
                    <Col className="ml-auto" md="2">
                        <CreateLeagueModal triggerRefreshOnGrid={this.updateDataset} buttonLabel="Create" />
                    </Col>
                </Row>
                <GeneralTable columns={columns} rowData={this.state.leagues} />
            </div>
        );
    }
}

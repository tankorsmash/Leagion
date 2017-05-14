import Spinner from 'react-spinkit';
import {
    Button, Card, CardBlock, CardImg, CardSubtitle, CardText, CardTitle,
    Col, Container, DropdownItem, DropdownMenu, Form, FormGroup, Input,
    Jumbotron, Label, Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle,
    Nav, NavItem, NavLink, Row, Table,
} from 'reactstrap';

import {Link, Redirect} from 'react-router-dom';
import DatasetView from 'components/dataset_view';
import {GeneralTable} from 'main/app/admin/components/table'

import ajax from 'common/ajax';

import adminUrls from 'main/app/admin/urls';
import pathToRegex from 'path-to-regexp';

import {FormBase} from 'components/forms';
import FormModal from 'components/form_modal';

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

class LeagueCreateForm extends React.Component {
    render() {
        let formData = this.props.formData;
        return (
            <Form onSubmit={this.props.handleSubmit} >
                <FormGroup>
                    <Label for="name">League name:</Label>
                    <Input
                        onChange={this.props.handleInputChange}
                        value={formData.name}
                        type="text"
                        name="name"
                        id="name"
                        placeholder="My New League"/>
                </FormGroup>
            </Form>
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
                        <FormModal
                            formComponent={LeagueCreateForm}
                            formData={{"name": ""}}
                            postUrl={reverse("api-league-list")}
                            triggerRefreshOnGrid={this.updateDataset}
                            buttonLabel="Create" />
                    </Col>
                </Row>
                <GeneralTable columns={columns} rowData={this.state.leagues} />
            </div>
        );
    }
}

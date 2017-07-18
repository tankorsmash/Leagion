import {Link} from 'react-router-dom';
import {
    Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter,
    Form, FormGroup, Label, Input
} from 'reactstrap';

import DatasetView from 'components/dataset_view';
import {GeneralTable} from 'main/app/admin/components/table'
import adminUrls from 'main/app/admin/urls';
import pathToRegex from 'path-to-regexp';

import FormModal from 'components/form_modal';

class LocationCreateForm extends React.Component {
    render() {
        let formData = this.props.formData;
        return (
            <Form>
                <FormGroup>
                    <Label for="name">Location name:</Label>
                    <Input
                        onChange={this.props.handleInputChange}
                        value={formData.name}
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Winchester Parks"/>
                </FormGroup>
            </Form>
        );
    }
}

export class LocationsPane extends DatasetView {
    get datasetStateAttr() {
        return "locations";
    };

    get datasetViewName() {
        return "api-location-list";
    }

    render() {
        let columns = [{
            id: "name",
            title: "Name",
        },];

        const formDefaults = {"name": ""};

        return (
            <div>
                <h3> Locations </h3>
                <Row>
                    <Col> <h3> Teams </h3> </Col>
                    <Col className="" md="2">
                        <FormModal
                            formComponent={LocationCreateForm}
                            formData={formDefaults}
                            postUrl={reverse("api-location-list")}
                            triggerRefreshOnGrid={this.updateDataset}
                            buttonLabel="Create"
                            modalHeaderLabel="Create Location"/>
                    </Col>
                </Row>
                <GeneralTable columns={columns} rowData={this.state.locations} />
            </div>
        );
    }
}

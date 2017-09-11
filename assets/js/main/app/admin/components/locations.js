import {Link} from 'react-router-dom';
import {
    DropdownItem, DropdownMenu, NavLink, Jumbotron,
    Row, Col, Card, CardImg, CardText, CardBlock,
    FormGroup, Form, Button, Label, Input,
    CardTitle, CardSubtitle, Container,
    Modal, ModalHeader, ModalBody, ModalFooter,
    UncontrolledTooltip
} from 'reactstrap';

import Spinner from 'react-spinkit';
import Datetime from 'react-datetime';

import adminUrls from 'main/app/admin/urls';
import pathToRegex from 'path-to-regexp';

import {DATE_FORMAT} from 'main/app/admin/constants';
import {GeneralTable} from 'main/app/admin/components/table'

import {FormBase} from 'components/forms';

import ajax from 'common/ajax';
import {AjaxTextInputUpdate} from 'main/app/admin/components/ajax_update';

import {NOT_LOADED} from 'common/constants';
import {buildPageTitle} from 'common/utils';
import DatasetView from 'components/dataset_view';

class LocationDetail extends DatasetView {
    constructor(props){
        super(props);

        //DatasetView sets props, and I wouldn't want to override it
        this.state['mapQueryUrl'] = this.buildMapQueryUrl("Ottawa, Ontario");
    }

    get datasetStateAttr() {
        return "location";
    }

    get datasetViewName() {
        return "api-location-detail";
    }

    get datasetViewKwargs() {
        return { location_id: this.props.match.params.locationId };
    }

    buildMapQueryUrl = (address) => {
        const TO_REPLACE = "AIzaSyDN4sIpEIF9D_eZYc601-MPXmgHQjYl4Zc";

        return `https://www.google.com/maps/embed/v1/place?key=${TO_REPLACE}&q=${encodeURIComponent(address)}`;
    }

    updateMapQueryUrl = () => {
        this.setState({
            mapQueryUrl: this.buildMapQueryUrl(this.state.location.address),
        });
    }

    render() {
        buildPageTitle("Locations Detail");
        if (this.getIsLoaded() == false) {
            return <Container fluid/>;
        };

        let location = this.state.location;
        const url = reverse("api-location-detail", {location_id: location.id});

        const putUrl = reverse("api-location-detail", {location_id: this.state.location.id});
        return (
            <Container fluid >
                <div className="text-center">
                    <Row>
                        <Col className="h4">
                            { location.name }
                        </Col>
                    </Row>
                    <Row>
                        <Col className="">
                            <AjaxTextInputUpdate
                                default="Enter address here"
                                data={ location.address }
                                putUrl={ putUrl }
                                putKwarg="address"
                                onSuccessCallback={ (data)=> { this.state.location.address = data.address; this.updateMapQueryUrl();}}
                            />
                        </Col>
                    </Row>
                    <br></br>
                    <iframe
                        width="600"
                        height="450"
                        frameBorder="0" style={{border:0}}
                        src={ this.buildMapQueryUrl(this.state.location.address) } allowFullScreen>
                    </iframe>
                </div>
            </Container>
        );
    };
};

module.exports = {
    LocationDetail: LocationDetail,
};

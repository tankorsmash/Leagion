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

import {NOT_LOADED} from 'common/constants';
import {buildPageTitle} from 'common/utils';
import DatasetView from 'components/dataset_view';

class LocationDetail extends DatasetView {
    constructor(props){
        super(props);
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

    render() {
        buildPageTitle("Locations Detail");
        if (this.getIsLoaded() == false) {
            return <Container fluid/>;
        };

        let location = this.state.location;
        const url = reverse("api-location-detail", {location_id: location.id});

        const TO_REPLACE = "AIzaSyDN4sIpEIF9D_eZYc601-MPXmgHQjYl4Zc";

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
                            { location.address }
                        </Col>
                    </Row>
                    <br></br>
                    <iframe
                        width="600"
                        height="450"
                        frameBorder="0" style={{border:0}}
                        src={ `https://www.google.com/maps/embed/v1/place?key=${TO_REPLACE}&q=${encodeURIComponent(location.address)},Seattle+WA` } allowFullScreen>
                    </iframe>
                </div>
            </Container>
        );
    };
};

module.exports = {
    LocationDetail: LocationDetail,
};

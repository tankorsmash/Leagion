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

import Moment from 'react-moment';
import moment from 'moment';
import uuid from 'uuid';

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

        return (
            <Container fluid>
                <h4 className="pr-1">
                    { location.name }
                </h4>
                <div>
                    CONTENT TBA
                </div>
            </Container>
        );
    };
};

module.exports = {
    LocationDetail: LocationDetail,
};

import {Link} from 'react-router-dom';
import { Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import DatasetView from 'components/dataset_view';
import {GeneralTable} from 'main/app/admin/components/table'
import adminUrls from 'main/app/admin/urls';
import pathToRegex from 'path-to-regexp';

class LocationContent extends React.Component {
    render() {
        let teams = this.props.teams;
        let content = "Not a team member";

        if (teams.length) {
            let teamContent = teams.map(team => {
                const teamUrlizer = pathToRegex.compile(adminUrls.teams.detail);
                const detailUrl = teamUrlizer({teamId: team.id});
                return (
                    <div key={team.id}>
                        <Link to={detailUrl}> { team.name } </Link>
                    </div>
                );
            });
            content = (
                <div>
                    <strong> Locations: </strong>
                    { teamContent}
                </div>
            );
        };

        return (
            <div>
                {content}
            </div>
        );
    }
}

class LocationModalBody extends DatasetView {
    get datasetStateAttr() {
        return "location";
    }

    get datasetViewName() {
        return "api-location-detail";
    }

    get datasetViewKwargs() {
        return {location_id: this.props.locationId};
    }

    render() {
        let location = this.state.location;

        //if not loaded, preload with placeholder
        if (this.getIsLoaded() == false) {
             location = { teams: [] };
        };


        return (
            <ModalBody>
                <div>
                    Email:
                    <span> <a href={`mailto:${location.email}`}>{ location.email }</a></span>
                </div>
                <div>
                    Number:
                    <span> { location.default_phonenumber }</span>
                </div>
                <div>
                    Alternate Number:
                    <span> { location.alt_phonenumber }</span>
                </div>
                <br/>
                <div>
                    <LocationContent teams={location.teams} />
                </div>
            </ModalBody>
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

        return (
            <div>
                <h3> Locations </h3>
                <GeneralTable columns={columns} rowData={this.state.locations} />
            </div>
        );
    }
}

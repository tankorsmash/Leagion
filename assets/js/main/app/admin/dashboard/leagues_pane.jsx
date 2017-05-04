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

class SeasonCell extends React.Component {
    render() {
        const league = this.props.data;
        return (
            <td> {league.seasons.length}</td>
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
            id: "seasons",
            title: "Seasons",
            component: SeasonCell,
        }];

        return (
            <div>
                <h3> Leagues </h3>
                <GeneralTable columns={columns} rowData={this.state.leagues} />;
            </div>
        );
    }
}

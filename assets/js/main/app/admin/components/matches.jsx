import {Link} from 'react-router-dom';

import ajax from 'common/ajax';
var Spinner = require('react-spinkit');

import {Container, Row, Col} from 'reactstrap';

import DatasetView from 'components/dataset_view';

import {SimplePlayer} from 'main/app/admin/components/players';

import {AjaxTextInputUpdate} from 'main/app/admin/components/ajax_update';
import {GeneralTable} from 'main/app/admin/components/table'

import adminUrls from 'main/app/admin/urls';
import pathToRegex from 'path-to-regexp';

import {NOT_LOADED} from 'common/constants';
import {buildPageTitle} from 'common/utils';

class RosterTable extends DatasetView {
    get datasetStateAttr() {
        return "roster";
    }

    get datasetViewName() {
        return "api-roster-detail";
    }

    get datasetViewKwargs() {
        return {roster_id: this.props.rosterId};
    }

    render() {
        if (this.getIsLoaded() == false) {
            return (<div>TABLE LOADING</div>);
        }

        const playerColumns = [{
            id: "full_name",
            title: this.props.fullNameHeaderText,
            component: (props) => <td>  {props.data.player.full_name} </td>
        }];

        return (
            <GeneralTable columns={playerColumns} rowData={this.state.roster.players} />
        );
    }
}

class MatchDetail extends DatasetView {
    get datasetStateAttr() {
        return "match";
    }

    get datasetViewName() {
        return "api-match-detail";
    }

    get datasetViewKwargs() {
        return {match_id: this.props.match.params.matchId};
    }

    render() {
        buildPageTitle("Match Detail");

        if (this.getIsLoaded() == false) {
            return (<Container fluid>UNLOADED </Container>);
        };

        const match = this.state.match;
        const putUrl = reverse("api-match-detail", {match_id: match.id});

        const homePlayersColumns = [{
            id: "full_name",
            title: `Home Players`,
            component: props => <td>  {props.data.player.full_name} </td>
        }];

        const awayPlayersColumns = [{
            id: "full_name",
            title: `Away Players`,
            component: props => <td>  {props.data.player.full_name} </td>
        }];

        return (
            <Container fluid>
                <h5>
                    { this.state.match.pretty_name }
                </h5>

                <div>
                    <RosterTable rosterId={match.home_roster} fullNameHeaderText="Home Players" />
                </div>
                <div>
                    <RosterTable rosterId={match.away_roster} fullNameHeaderText="Away Players" />
                </div>
            </Container>
        );
    };
};

class MatchesCreate extends React.Component {
    render() {
        buildPageTitle("Matches Create");
        return (
            <div> Matches Create </div>
        );
    };
};

module.exports = {
    MatchDetail: MatchDetail,
    MatchesCreate: MatchesCreate
};

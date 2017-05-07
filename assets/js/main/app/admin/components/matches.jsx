import {Link} from 'react-router-dom';

import ajax from 'common/ajax';
var Spinner = require('react-spinkit');

import {Container, Row, Col} from 'reactstrap';

import {DatasetView} from 'components/dataset_view';

import {SimplePlayer} from 'main/app/admin/components/players';

import {AjaxTextInputUpdate} from 'main/app/admin/components/ajax_update';
import {GeneralTable} from 'main/app/admin/components/table'

import adminUrls from 'main/app/admin/urls';
import pathToRegex from 'path-to-regexp';

import {NOT_LOADED} from 'common/constants';
import {buildPageTitle} from 'common/utils';

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
                    <GeneralTable columns={homePlayersColumns} rowData={match.home_roster.players} />
                </div>
                <div>
                    <GeneralTable columns={awayPlayersColumns} rowData={match.away_roster.players} />
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

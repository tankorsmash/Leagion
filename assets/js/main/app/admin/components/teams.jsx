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

class Team extends React.Component {
    render() {
        let team = this.props.team;
        return (
            <div>
                Team name: { team.name }

                <div className="pl-sm-3">
                    { team.players.map(player => {
                        return <SimplePlayer
                            player={player}
                            key={player.id}
                        />
                    }) }
                </div>
            </div>
        );
    }
}


class Teams extends React.Component {
    constructor(props){
        super(props);
        this.state = { teams: NOT_LOADED };
    }

    componentDidMount() {
        this.updateDataset();
    }

    updateDataset() {
        let url = reverse('api-team-list');

        ajax({
            url: url,
        }).then(data => {
            //if there's only one object, its a single detail team, so arrayify it
            this.setState({teams: data});
        });
    }


    render() {
        let isLoaded = this.state.teams !== NOT_LOADED;

        let content;
        if (isLoaded == false) {
            content = <Spinner spinnerName='three-bounce' />;
        } else {
            content = this.state.teams.map((team)=>{
                return <Team team={team} key={team.id} />
            });
        }

        return <div>{content}</div>;
    }
}


class TeamDetail extends DatasetView {
    get datasetStateAttr() {
        return "team";
    }

    get datasetViewName() {
        return "api-team-detail";
    }

    get datasetViewKwargs() {
        return {team_id: this.props.match.params.teamId};
    }
    render() {
        buildPageTitle("Team Detail");
        if (this.getIsLoaded() == false) {
            return (<Row>UNLOADED </Row>);
        };

        const team = this.state.team;
        const putUrl = reverse("api-team-detail", {team_id: team.id});

        const matchUrlizer = pathToRegex.compile(adminUrls.matches.detail);
        const matchColumns = [{
            id: "pretty_name",
            title: `Matches (total: ${team.matches.length})`,
            component: props => <td> <Link to={matchUrlizer({matchId: props.data.id})}> {props.data.pretty_name} </Link> </td>
        }];

        // TODO: make a players admin view so you can link to it
        // const playersUrlizer = pathToRegex.compile(adminUrls.players.detail);
        const playersColumns = [{
            id: "full_name",
            title: `Players (total: ${team.players.length})`,
            // component: props => <td> <Link to={playersUrlizer({playerId: props.data.id})}> {props.data.name} </Link> </td>
        }];

        return (
            <Container fluid>
                <h5>
                    <AjaxTextInputUpdate
                        data={ this.state.team.name }
                        putUrl={putUrl}
                        putKwarg="name" />
                </h5>

                <div>
                    <GeneralTable columns={playersColumns} rowData={team.players} />
                </div>
                <div>
                    <GeneralTable columns={matchColumns} rowData={team.matches} />
                </div>
            </Container>
        );
    };
};

class TeamsCreate extends React.Component {
    render() {
        buildPageTitle("Teams Create");
        return (
            <div> Teams Create </div>
        );
    };
};

module.exports = {
    Teams: Teams,
    TeamDetail: TeamDetail,
    TeamsCreate: TeamsCreate
};

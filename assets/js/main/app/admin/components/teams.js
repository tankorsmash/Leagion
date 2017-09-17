import {Link} from 'react-router-dom';

import ajax from 'common/ajax';

import FontAwesome from 'react-fontawesome';

import {
    Container, Row, Col, ButtonDropdown, Button,
    DropdownToggle, DropdownMenu, DropdownItem,
    Modal, ModalHeader, ModalBody, ModalFooter,
    CardDeck, CardColumns
} from 'reactstrap';

import DatasetView from 'components/dataset_view';
import FormModal from 'components/form_modal';

import {AjaxTextInputUpdate} from 'main/app/admin/components/ajax_update';
import {GeneralTable} from 'main/app/admin/components/table'
import {PlayerCard, CreatePlayerCard} from 'main/app/admin/components/players'

import MatchCreateForm from 'main/app/admin/dashboard/create-match-form'

import adminUrls from 'main/app/admin/urls';
import pathToRegex from 'path-to-regexp';

import {NOT_LOADED} from 'common/constants';
import {buildPageTitle} from 'common/utils';

class RemoveUserFromTeamModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalOpen: false
        };
    }

    toggle = () => {
        this.setState({
            modalOpen: !this.state.modalOpen
        });
    }

    removeFromTeam = (e) => {
        //get list of current team members
        let playerIds = this.props.team.player_ids;
        playerIds = playerIds.filter((playerId) => {
            return playerId != this.props.user.id;
        });
        //post list of team members minus user
        const teamUrl = reverse("api-team-detail", {team_id: this.props.team.id});

        ajax({
            url: teamUrl,
            method: 'PATCH',
            data: {
                player_ids: playerIds,
            },
        }).then( response => {
            toastr.success("Removed user from team");
            this.props.triggerRefreshOnGrid();
        }, error => {
            toastr.error("Failed to remove user from team");
        });

        //close modal
        this.toggle();
    }

    render() {
        return (
            <div>
                <div color="danger" onClick={this.toggle}>Remove from Team</div>

                <Modal isOpen={this.state.modalOpen} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Remove user from team?</ModalHeader>
                    <ModalBody>
                        Removing user from team cannot be undone
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={this.removeFromTeam}>Remove from team</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    };
}

class PlayerActionCell extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dropdownOpen: false
        };
    }

    toggle = () => {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    render() {
        return (
            <td>
                <PlayerCard player={this.props.data} />
                <ButtonDropdown group={false} isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                    <DropdownToggle >
                        <FontAwesome name="ellipsis-h"/>
                    </DropdownToggle>
                    <DropdownMenu right>
                        <DropdownItem>
                            <RemoveUserFromTeamModal
                                team={this.props.contextData.team}
                                triggerRefreshOnGrid={this.props.contextData.triggerRefreshOnGrid}
                                user={this.props.data}
                            />
                        </DropdownItem>
                    </DropdownMenu>
                </ButtonDropdown>
            </td>
        );
    };
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

    removePlayerFromTeam = (player) => {
        //post list of team members minus user
        const teamUrl = reverse("api-team-players-remove", {team_id: this.state.team.id});

        ajax({
            url: teamUrl,
            method: 'PATCH',
            data: {
                player_ids: [player.id],
            },
        }).then( response => {
            toastr.success("Removed Player from team");
            this.updateDataset();
        }, error => {
            toastr.error("Failed to remove player from team");
        });
    }

    render() {
        buildPageTitle("Team Detail");
        if (this.getIsLoaded() == false) {
            return (<Container fluid>Loading... </Container>);
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

        const initialFormData = {
            "match_datetime": "2017/12/25",
            "location": "Ottawa, Ontario",
            "home_or_away": "-1",
            "other_team_id": "",
            "season": team.season_id,
            "postponed_from": "",
            "home_roster": "",
            "away_roster": "",
            "my_team_id": team.id,
            "postponed_from": null,
        };

        return (
            <Container fluid className="pt-1">
                <h1>
                    <AjaxTextInputUpdate
                        data={this.state.team.name}
                        putUrl={putUrl}
                        putKwarg="name" />
                </h1>


                <div className="d-lg-flex">
                    <CardDeck style={{flexBasis: "60%"}} className="justify-content-between">

                        <CreatePlayerCard
                            onCreateCallback={ this.updateDataset }
                            team={team}
                            key={-1} />

                        { team.players.map((player, i) => {
                            return (
                                <PlayerCard
                                    actions={[{
                                        "text" : "Remove from team",
                                        "action": () => { this.removePlayerFromTeam(player); }
                                    }]}
                                    team={team}
                                    player={player}
                                    key={i} />
                            );
                        }) }
                    </CardDeck>

                    <div>
                        <FormModal
                            formComponent={MatchCreateForm}
                            formData={initialFormData}
                            postUrl={reverse("api-match-list")}
                            buttonLabel="Create Match"
                            modalHeaderLabel="Create Match"/>
                        <GeneralTable
                            perPage={15}
                            columns={matchColumns}
                            rowData={team.matches} />
                    </div>
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
    TeamDetail: TeamDetail,
    TeamsCreate: TeamsCreate
};

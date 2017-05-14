import {Link} from 'react-router-dom';

import ajax from 'common/ajax';
var Spinner = require('react-spinkit');

import {
    Container, Row, Col, ButtonDropdown, Button,
    DropdownToggle, DropdownMenu, DropdownItem,
    Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';

import DatasetView from 'components/dataset_view';

import {SimplePlayer} from 'main/app/admin/components/players';

import {AjaxTextInputUpdate} from 'main/app/admin/components/ajax_update';
import {GeneralTable} from 'main/app/admin/components/table'

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
                <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                    <DropdownToggle caret>
                        Actions
                    </DropdownToggle>
                    <DropdownMenu>
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
        // const playersUrlizer = pathToRegex.compile(adminUrls.players.detail);
        const playersColumns = [{
            id: "full_name",
            title: `Players (total: ${team.players.length})`,
            // component: props => <td> <Link to={playersUrlizer({playerId: props.data.id})}> {props.data.name} </Link> </td>
        },{
            id: "actions",
            title: `Actions`,
            component: PlayerActionCell,
        }];

        return (
            <Container fluid>
                <h5>
                    <AjaxTextInputUpdate
                        data={ this.state.team.name }
                        putUrl={putUrl}
                        putKwarg="name" />
                </h5>

                <div className="d-flex justify-content-around">
                    <div className="">
                        <GeneralTable contextData={{team: team, triggerRefreshOnGrid: this.updateDataset}} columns={playersColumns} rowData={team.players} />
                    </div>
                    <div>
                        <GeneralTable columns={matchColumns} rowData={team.matches} />
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

import {Link} from 'react-router-dom';
import { Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import DatasetView from 'components/dataset_view';
import {GeneralTable} from 'main/app/admin/components/table'
import adminUrls from 'main/app/admin/urls';
import pathToRegex from 'path-to-regexp';

class TeamContent extends React.Component {
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
                    <strong> Teams: </strong>
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

class PlayerModalBody extends DatasetView {
    get datasetStateAttr() {
        return "player";
    }

    get datasetViewName() {
        return "api-player-detail";
    }

    get datasetViewKwargs() {
        return {player_id: this.props.playerId};
    }

    render() {
        let player = this.state.player;

        //if not loaded, preload with placeholder
        if (this.getIsLoaded() == false) {
             player = { teams: [] };
        };


        return (
            <ModalBody>
                <div>
                    Email:
                    <span> <a href={`mailto:${player.email}`}>{ player.email }</a></span>
                </div>
                <div>
                    Number:
                    <span> { player.default_phonenumber }</span>
                </div>
                <div>
                    Alternate Number:
                    <span> { player.alt_phonenumber }</span>
                </div>
                <br/>
                <div>
                    <TeamContent teams={player.teams} />
                </div>
            </ModalBody>
        );
    }
}

class PlayerNameCell extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false
        };

        this.toggle = this.toggle.bind(this);
    }

    toggle(e) {
        if (e) { e.preventDefault(); } //stop from scrolling to top of page

        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        const player = this.props.data;
        return (
            <td>
                <a href="#" onClick={this.toggle}> { player.full_name }</a>

                <Modal
                    backdropTransitionTimeout={25}
                    modalTransitionTimeout={50}
                    fade={false}
                    isOpen={this.state.isOpen}
                    toggle={this.toggle}
                    className={this.props.className}>

                    <ModalHeader toggle={this.toggle}> { player.full_name }</ModalHeader>

                    <PlayerModalBody playerId={player.id} />

                    <ModalFooter>
                        <Button color="secondary" onClick={this.toggle}>Close</Button>
                    </ModalFooter>
                </Modal>
            </td>
        );
    }
}

export class PlayersPane extends DatasetView {
    get datasetStateAttr() {
        return "players";
    };

    get datasetViewName() {
        return "api-player-list";
    }

    render() {
        let columns = [{
            id: "full_name",
            title: "Name",
            component: PlayerNameCell,
        },{
            id: "email",
            title: "Email",
        }];

        return (
            <div>
                <h3> Players </h3>
                <GeneralTable columns={columns} rowData={this.state.players} />
            </div>
        );
    }
}

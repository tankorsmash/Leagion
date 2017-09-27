import {Link} from 'react-router-dom';
import {
    Row, Col, Button,
    Modal, ModalHeader, ModalBody, ModalFooter,
    DropdownItem, UncontrolledTooltip
} from 'reactstrap';

import FuzzySearch from 'components/fuzzy-search';
import DatasetView from 'components/dataset_view';
import {GeneralTable} from 'main/app/admin/components/table'
import FormModal from 'components/form_modal';
import ajax from 'common/ajax';

import PlayerCreateForm from 'main/app/admin/components/forms/create-player-form'

import adminUrls from 'main/app/admin/urls';
import pathToRegex from 'path-to-regexp';

class QueuedLeague extends React.Component {
    render() {
        const league = this.props.league;

        return (
            <DropdownItem toggle={false} id={`remove-league-${league.id}`} onClick={(e)=>{ this.props.onRemove(league); }}>
                { league.name }
                <UncontrolledTooltip placement="right" target={`remove-league-${league.id}`}>
                    Click to uncommission from league
                </UncontrolledTooltip>
            </DropdownItem>
        );
    };
};


class QueuedLeagueList extends React.Component {
    render() {
        const style = {
            listStyleType: "none"
        };
        return (
            <ul style={style}>
                { this.props.queuedLeagues.map((league, i) => {
                    return <QueuedLeague onRemove={this.props.onRemove} key={i} league={league} />;
                }) }
            </ul>
        );
    };
};

class AddLeagueBySearch extends DatasetView {
    get datasetStateAttr() {
        return "leagues";
    }

    get datasetViewName() {
        return "api-league-list";
    }

    constructor(props) {
        super(props);
    };

    render() {
        if (this.getIsLoaded() == false) {
            return (<div> Gathering available players... </div>);
        }

        //TODO add to team
        return (
            <div>
                <QueuedLeagueList
                    onRemove={this.props.removeLeagueIdFromQueue}
                    queuedLeagues={this.props.queuedLeagues} />
                <FuzzySearch
                    list={this.state.leagues}
                    keys={['name',]}
                    width={430}
                    onSelect={this.props.queueLeague}
                    ResultsComponent={SearchLeagueTemplate}
                    placeholder={"Add league"}
                />
            </div>
        );
    }
};


class SearchLeagueTemplate extends React.Component {
    render() {
        return (
            <div>
                { this.props.state.results.map((league, i) => {
                    return (
                        <DropdownItem toggle={false} active={i === this.props.state.selectedIndex} key={i} onClick={() => this.props.onClick(i)}>
                            {league.name}
                        </DropdownItem>
                    );
                })}
            </div>
        );
    };
};


class FuzzyLeagueInput extends DatasetView {
    get datasetStateAttr() {
        return "leagues";
    }

    get datasetViewName() {
        return "api-league-list";
    }

    render() {
        if (this.getIsLoaded() == false) {
            return (<div> Gathering available leagues... </div>);
        }

        let formData = this.props.formData;
        return (
            <FuzzySearch
                list={this.state.leagues}
                keys={['name']}
                width={430}
                onSelect={this.props.onSelect}
                ResultsComponent={SearchLeagueTemplate}
                placeholder={"Add league to commission"}
                name="league_id"
            />
        );
    }
}

class LeagueCommissionerContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            queuedLeagues: this.props.player.leagues_commissioned,
        };
    }

    removeLeagueIdFromQueue = (leagueId) => {
        let prunedArray = this.state.queuedLeagues.filter(league => league !== leagueId);
        this.setState({
            queuedLeagues: prunedArray,
        });
    }

    queueLeague = (league) => {
        let matches = this.state.queuedLeagues.filter(league => league.id === league.id);
        if (matches.length > 0) {
            toastr.error("League already added!");
            return;
        }

        const url = reverse("api-player-commissioner-add", {player_id: this.props.player.id});
        ajax({
            url: url,
            data: {
                league_ids: [league.id],
            },
            method: "PATCH",
        }).then(
        data => {
            toastr.success(`Player is now commissioner for ${league.name}!`);
        }, error => {
            toastr.error(`Failed to set player as league commissioner`);
        });

        this.setState({
            queuedLeagues: this.state.queuedLeagues.concat([league])
        });
    }


    render() {
        const player = this.props.player;
        return (
            <div>
                <strong>Leagues Commissioned:</strong>
                <AddLeagueBySearch
                    removeLeagueIdFromQueue={this.removeLeagueIdFromQueue}
                    queuedLeagues={this.state.queuedLeagues}
                    queueLeague={this.queueLeague}
                />
            </div>
        );
    }
}

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

    onNewLeagueCommission = (league) => {


    }

    render() {
        let player = this.state.player;

        //if not loaded, preload with placeholder
        if (this.getIsLoaded() == false) {
            return (<ModalBody/>);
        };


        return (
            <ModalBody>
                <div>
                    <strong> Contact Info </strong>
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
                </div>
                <div>
                    <LeagueCommissionerContent player={player} />
                </div>
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

        const initialFormData = {
            "name": "Jonah Smitt",
            "email": "example@mail.com",
            "password": "",
            "captain_of_teams": [],
        };

        return (
            <div>
                <Row>
                    <Col> <h3> Players </h3> </Col>
                    <Col className="" md="2">
                        <FormModal
                            formComponent={PlayerCreateForm}
                            formData={initialFormData}
                            postUrl={reverse("api-player-list")}
                            triggerRefreshOnGrid={this.updateDataset}
                            buttonLabel="Add"
                            modalHeaderLabel="Add User"/>
                    </Col>
                </Row>

                <GeneralTable
                    columns={columns}
                    rowData={this.state.players} />
            </div>
        );
    }
}

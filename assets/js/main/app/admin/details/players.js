import ajax from 'common/ajax';
import Moment from 'react-moment';

import {Container, Row, Col, ButtonGroup, Button, Media,
    UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem,
    Card, CardImg, CardBody, CardText, CardTitle,

    Modal, ModalHeader, ModalBody, ModalFooter

} from 'reactstrap';

import FontAwesome from 'react-fontawesome';
import PropTypes from 'prop-types';

import FuzzySearch from 'components/fuzzy-search';
import SpinLoader from 'components/spinloader.js';


import DatasetView from 'components/dataset_view';

class SearchPlayerTemplate extends React.Component {
    render() {
        return (
            <div>
                { this.props.state.results.map((player, i) => {
                    return (
                        <div key={i} onClick={() => this.props.onClick(i)}>
                            {player.full_name}
                            <span style={{ float: 'right', opacity: 0.5 }}>{player.email}</span>
                        </div>
                    );
                })}
            </div>
        );
    };
};


class QueuedPlayer extends React.Component {
    render() {
        const player = this.props.player;

        const style = {
            backgroundColor: '#fff',
            position: 'relative',
            padding: '12px',
            borderTop: '1px solid #eee',
            color: '#666',
            fontSize: 14,
            cursor: 'pointer',

        }

        return (
            <li style={style} onClick={(e)=>{ this.props.onRemove(player.id); }}>
                <span>
                    { player.full_name }
                    <small> {player.email} </small>
                </span>
            </li>
        );
    };
};


class QueuedPlayersList extends React.Component {
    render() {
        const style = {
            listStyleType: "none"
        };
        return (
            <ul style={style}>
                { this.props.queuedPlayers.map((player, i) => {
                    return <QueuedPlayer onRemove={this.props.onRemove} key={i} player={player} />;
                }) }
            </ul>
        );
    };
};

class AddPlayerBySearch extends DatasetView {
    get datasetStateAttr() {
        return "players";
    }

    get datasetViewName() {
        return "api-player-list";
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
                <QueuedPlayersList
                    onRemove={this.props.removePlayerIdFromQueue}
                    queuedPlayers={this.props.queuedPlayers} />
                <FuzzySearch
                    list={this.state.players}
                    keys={['full_name', 'email']}
                    width={430}
                    onSelect={this.props.queuePlayers}
                    ResultsComponent={SearchPlayerTemplate}
                    placeholder={"Add player by name or email"}
                />
            </div>
        );
    }
};

export class CreatePlayerCard extends React.Component {
    static propTypes = {
        player: PropTypes.shape({
            full_name: PropTypes.string.isRequired,
            email: PropTypes.string,
        })
    }

    constructor(props) {
        super(props);
        this.state = {
            modalOpen: false
        };
    }

    toggle = () => {
        this.setState({
            modalOpen: !this.state.modalOpen,
            queuedPlayers: [],
        });
    }

    addToTeam = (e) => {
        //get list of current team members
        let playerIds = this.state.queuedPlayers.map((player, i) => {
            return player.id;
        });
        //post list of team members minus user
        const teamUrl = reverse("api-team-players-add", {team_id: this.props.team.id});

        ajax({
            url: teamUrl,
            method: 'PATCH',
            data: {
                player_ids: playerIds,
            },
        }).then( response => {
            toastr.success("Added player(s) to team!");
        }, error => {
            toastr.error("Failed to add user(s) to team");
        });

        this.props.onCreateCallback();

        //close modal
        this.toggle();
    }

    queuePlayers = (player) => {
        let matches = this.state.queuedPlayers.filter(plr => plr.id === player.id);
        if (matches.length > 0) {
            toastr.error("Player already added!");
            return;
        }

        this.setState({
            queuedPlayers: this.state.queuedPlayers.concat([player])
        });
    }

    removePlayerIdFromQueue = (playerId) => {
        let prunedArray = this.state.queuedPlayers.filter(plr => plr.id !== playerId);
        this.setState({
            queuedPlayers: prunedArray,
        });
    }


    render() {
        return (
            <div>
                <Card>
                    <CardImg top className="w-100" src={`https://placeholdit.imgix.net/~text?txtsize=64&txt=Add%20Player&w=318&h=240`}/>
                    <CardBody className="d-flex">
                        <Button block color="link" onClick={this.toggle} className="">
                            <FontAwesome size="4x" name="plus"/>
                        </Button>
                    </CardBody>
                </Card>

                <Modal fade={false} isOpen={this.state.modalOpen} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Add existing player to team</ModalHeader>
                    <ModalBody>
                        <AddPlayerBySearch
                            queuedPlayers={this.state.queuedPlayers}
                            queuePlayers={this.queuePlayers}
                            removePlayerIdFromQueue={this.removePlayerIdFromQueue}
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.addToTeam}>Add</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    };
};


export class PlayerCard extends React.Component {
    static propTypes = {
        player: PropTypes.shape({
            full_name: PropTypes.string.isRequired,
            email: PropTypes.string,
        })
    }

    constructor(props){
        super(props);
        this.state = {
            "placeholder_player": [],
        }
        //return early to disable the api 504 warnings
        return;
        ajax({
            url: "https://randomuser.me/api/?gender=male",
        }).then(data => {
            //this throws a react error if the component unmounts
            //before this promise is completed. I think it's harmless
            this.setState({
                placeholder_player: data.results[0],
            });
        }, error => {
            console.warn(error);
        });

    }

    render() {
        const player = this.props.player;

        //randomuser.me has only 200 male faces so we make sure to stay within that
        const limited_player_id = player.id % 200;
        return (
            <Card style={{flexBasis: "25%"}}>
                <CardImg top className="w-100" src={`https://randomuser.me/api/portraits/men/${limited_player_id}.jpg`}/>
                <CardBody>
                    <CardTitle>{ player.full_name }</CardTitle>
                    <CardText>

                        <small>
                            <cite title="Ottawa, Canada">
                                Ottawa, Canada <FontAwesome name="map-marker"/>&nbsp;
                            </cite>
                        </small>

                        <FontAwesome name="envelope"/> { player.email }
                        <br />
                        <FontAwesome name="globe"/><a href="http://www.jquery2dotnet.com"> www.jquery2dotnet.com</a>
                        <br />
                        <FontAwesome name="gift"/> <Moment>{ this.state.placeholder_player.dob }</Moment>

                    </CardText>
                        <UncontrolledDropdown>
                            <DropdownToggle caret>
                                Actions
                            </DropdownToggle>
                            <DropdownMenu>
                                { this.props.actions.map((actionData, i) => {
                                    return (
                                        <DropdownItem key={i} onClick={actionData.action}>
                                            { actionData.text }
                                        </DropdownItem>
                                    );
                                })}
                            </DropdownMenu>
                        </UncontrolledDropdown>
                </CardBody>
            </Card>
        );
    }
}

export default class PlayerDetail extends DatasetView {
    get datasetStateAttr() {
        return "player";
    }

    get datasetViewName() {
        return "api-player-detail";
    }

    get datasetViewKwargs() {
        return {player_id: this.props.match.params.playerId};
    }
    render() {
        if (this.getIsLoaded() == false) {
            return (<Container fluid>PLAYER LOADING</Container>);
        }

        const player = {
            full_name: this.state.player.full_name,
            email: this.state.player.email
        };
        return (
            <Container fluid>
                <Row>
                    <Col xs="12" sm="6" md="6">
                        <PlayerCard player={player} />
                    </Col>
                </Row>
            </Container>
        )
    }
}

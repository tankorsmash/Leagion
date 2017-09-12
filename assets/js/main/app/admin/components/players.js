import ajax from 'common/ajax';
import Moment from 'react-moment';

import {Container, Row, Col, ButtonGroup, Button, Media,
    UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem,
    Card, CardImg, CardBlock, CardText, CardTitle,

    Modal, ModalHeader, ModalBody, ModalFooter

} from 'reactstrap';

import FontAwesome from 'react-fontawesome';
import PropTypes from 'prop-types';

import FuzzySearch from 'react-fuzzy';
import SpinLoader from 'components/spinloader.js';


import DatasetView from 'components/dataset_view';

const list = [{
    id: 1,
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald'
}, {
    id: 2,
    title: 'The DaVinci Code',
    author: 'Dan Brown'
}, {
    id: 3,
    title: 'Angels & Demons',
    author: 'Dan Brown'
}];

//edited to use full name and email from react-fuzzy
function search_player_template(props, state, styles, clickHandler) {
  return state.results.map((player, i) => {
    const style = state.selectedIndex === i ? styles.selectedResultStyle : styles.resultsStyle;
    return (
      <div key={i} style={style} onClick={() => clickHandler(i)}>
        {player.full_name}
        <span style={{ float: 'right', opacity: 0.5 }}>{player.email}</span>
      </div>
    );
  });
}

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

        this.state['queuedPlayers'] = [];
    };

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
        if (this.getIsLoaded() == false) {
            return (<div> Gathering available players... </div>);
        }

        //TODO add to team
        return (
            <div>
                <QueuedPlayersList onRemove={this.removePlayerIdFromQueue} queuedPlayers={this.state.queuedPlayers} />
                <FuzzySearch
                    list={this.state.players}
                    keys={['full_name', 'email']}
                    width={430}
                    onSelect={this.queuePlayers}
                    resultsTemplate={search_player_template}
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
            modalOpen: !this.state.modalOpen
        });
    }

    addToTeam = (e) => {
        //get list of current team members
        let playerIds = this.props.team.player_ids;
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

        //close modal
        // this.toggle();
    }

    render() {
        return (
            <div>
                <Card>
                    <CardImg top className="w-100" src={`https://placeholdit.imgix.net/~text?txtsize=64&txt=Add%20Player&w=318&h=240`}/>
                    <CardBlock className="d-flex">
                        <Button block color="link" onClick={this.toggle} className="">
                            <FontAwesome size="4x" name="plus"/>
                        </Button>
                    </CardBlock>
                </Card>

                <Modal fade={false} isOpen={this.state.modalOpen} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Add existing player to team</ModalHeader>
                    <ModalBody>
                        <AddPlayerBySearch />
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
            <Card>
                <CardImg top className="w-100" src={`https://randomuser.me/api/portraits/men/${limited_player_id}.jpg`}/>
                <CardBlock>
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
                                Social
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem>Facebook</DropdownItem>
                                <DropdownItem disabled>Twitter</DropdownItem>
                                <DropdownItem divider></DropdownItem>
                                <DropdownItem>Other</DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                </CardBlock>
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

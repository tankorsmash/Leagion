import ajax from 'common/ajax';
import Moment from 'react-moment';

import {Container, Row, Col, ButtonGroup, Button, Media,
    UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem,
    Card, CardImg, CardBlock, CardText, CardTitle} from 'reactstrap';
import FontAwesome from 'react-fontawesome';
import PropTypes from 'prop-types';

import DatasetView from 'components/dataset_view';


export class CreatePlayerCard extends React.Component {
    static propTypes = {
        player: PropTypes.shape({
            full_name: PropTypes.string.isRequired,
            email: PropTypes.string,
        })
    }

    constructor(props){
        super(props);
    }

    render() {
        return (
            <Card>
                <CardImg top className="w-100" src={`https://placeholdit.imgix.net/~text?txtsize=64&txt=Add%20Player&w=318&h=240`}/>
                <CardBlock className="d-flex">
                    <Button block color="link" className="">
                        <FontAwesome size="4x" name="plus"/>
                    </Button>
                </CardBlock>
            </Card>
        );
    }
}

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

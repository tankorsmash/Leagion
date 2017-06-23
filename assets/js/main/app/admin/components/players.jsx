import {Container, Row, Col, ButtonGroup, Button, Media,
    UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem,
    Card, CardImg, CardBlock, CardText, CardTitle} from 'reactstrap';
import FontAwesome from 'react-fontawesome';
import PropTypes from 'prop-types';

import DatasetView from 'components/dataset_view';


export class PlayerCard extends React.Component {
    static propTypes = {
        player: PropTypes.shape({
            full_name: PropTypes.string.isRequired,
            email: PropTypes.string,
        })
    }

    render() {
        const player = this.props.player;

        return (
            <Card>
                <CardImg top className="w-100" src="http://placehold.it/300x200&text==D"/>
                <CardBlock>
                    <CardTitle>{ player.full_name }</CardTitle>
                    <CardText>
                        <small>
                            <cite title="Ottawa, Canada">
                                Ottawa, Canada <FontAwesome name="map-marker"/>
                            </cite>
                        </small>
                        <CardText>
                            <FontAwesome name="envelope"/> { player.email }
                            <br />
                            <FontAwesome name="globe"/><a href="http://www.jquery2dotnet.com"> www.jquery2dotnet.com</a>
                            <br />
                            <FontAwesome name="gift"/> June 02, 1988
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
                    </CardText>
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

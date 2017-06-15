import {Container, Row, Col, Card, ButtonGroup, Button, Media,
        UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
import FontAwesome from 'react-fontawesome';
import DatasetView from 'components/dataset_view';

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

        return (
            <Container fluid>
                <Row>
                    <Col xs="12" sm="6" md="6">
                        <Card>
                            <div className="row">
                                <Col sm="6" md="4">
                                    <Media object fluid src="http://placehold.it/180x200" alt="" />
                                </Col>
                                <Col sm="6" md="8">
                                    <h4> John Smith</h4>
                                    <small>
                                        <cite title="Ottawa, Canada">
                                            Ottawa, Canada <FontAwesome name="map-marker"/>
                                        </cite>
                                    </small>
                                    <p>
                                        <FontAwesome name="envelope"/> email@example.com
                                        <br />
                                        <FontAwesome name="globe"/><a href="http://www.jquery2dotnet.com"> www.jquery2dotnet.com</a>
                                        <br />
                                        <FontAwesome name="gift"/> June 02, 1988
                                    </p>
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
                                </Col>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </Container>
        )
    }
}

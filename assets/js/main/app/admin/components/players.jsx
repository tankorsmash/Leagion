import {Container, Row, Col} from 'reactstrap';
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
                Loaded!
            </Container>
        );
    };
}

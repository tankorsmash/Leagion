import { Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import DatasetView from 'components/dataset_view';
import {GeneralTable} from 'main/app/admin/components/table'

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
        if (this.getIsLoaded() == false) {
            return (<ModalBody> Player Detail </ModalBody>);
        };

        const player = this.state.player;
        return (
            <ModalBody>
                <div>
                    Email:
                    <span> { player.email } </span>
                </div>
                <div>
                    Number:
                    <span> { player.default_phonenumber }</span>
                </div>
                <div>
                    Alternate Number:
                    <span> { player.alt_phonenumber }</span>
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

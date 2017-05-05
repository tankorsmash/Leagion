import {DatasetView} from 'components/dataset_view';
import {GeneralTable} from 'main/app/admin/components/table'

export class PlayersPane extends DatasetView {
    get datasetStateAttr() {
        return "players";
    };

    get datasetViewName() {
        return "api-player-list";
    }

    render() {
        let columns = [{
            id: "id",
            title: "ID",
        },{
            id: "full_name",
            title: "Name",
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

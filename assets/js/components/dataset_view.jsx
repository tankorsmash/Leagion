import ajax from 'common/ajax';
import reverse from 'common/reverse';

import {NOT_LOADED} from 'common/constants';

export class DatasetView extends React.Component {
    get datasetStateAttr() {
        return "datasetStateAttr";
    }

    get datasetViewName() {
        return "unset-dataset-view-name";
    }

    get datasetViewKwargs() {
        // ie: return {kwargName: "kwargValue"};
        return {};
    }

    constructor(props){
        super(props);
        this.state = { [this.datasetStateAttr]: NOT_LOADED };
    }

    componentDidMount() {
        this.updateDataset();
    }

    updateDataset = () => {
        let url = reverse(this.datasetViewName, this.datasetViewKwargs);

        ajax({
            url: url,
        }).then(data => {
            this.setState({[this.datasetStateAttr]: data});
        }, error => {
            console.warn(error);
        });
    }
};

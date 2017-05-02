import ajax from 'common/ajax';
import reverse from 'common/reverse';

import {NOT_LOADED} from 'common/constants';

export class DatasetView extends React.Component {
    datasetStateAttr: "datasetStateAttr";
    datasetViewName: "unset-dataset-view-name";
    datasetViewKwargs: {}; // ie: {kwargName: "kwargValue"}; can set this in the ctor if you need access to `this`

    getIsLoaded() {
        return this.state[this.datasetStateAttr] !== NOT_LOADED;
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

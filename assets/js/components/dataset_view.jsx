import ajax from 'common/ajax';
import reverse from 'common/reverse';

import {NOT_LOADED} from 'common/constants';

export class DatasetView extends React.Component {
    get datasetStateAttr() {
        return "dataset";
    }

    get datasetViewName() {
        return "unset-dataset-view-name";
    }

    get datasetViewKwargs() {
        // for example, {kwargName: "kwargValue"};
        return {};
    }

    constructor(props){
        super(props);
        this.state = {
            [this.datasetStateAttr]: [],
            isLoaded: false,
        };
    }

    getIsLoaded() {
        return this.state.isLoaded;
    }


    componentDidMount() {
        this.updateDataset();
    }

    updateDataset = () => {
        let url = reverse(this.datasetViewName, this.datasetViewKwargs);

        ajax({
            url: url,
        }).then(data => {
            this.setState({
                [this.datasetStateAttr]: data,
                isLoaded: true,
            });
        }, error => {
            console.warn(error);
        });
    }
};

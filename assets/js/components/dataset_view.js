import ajax from 'common/ajax';
import reverse from 'common/reverse';

export default class DatasetView extends React.Component {
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

    get datasetInitialValue() {
        return null;
    }

    constructor(props){
        super(props);
        this.state = {
            [this.datasetStateAttr]: this.datasetInitialValue,
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
            //this throws a react error if the component unmounts
            //before this promise is completed. I think it's harmless
            this.setState({
                [this.datasetStateAttr]: data,
                isLoaded: true,
            });
        }, error => {
            console.warn(error);
        });
    };
}

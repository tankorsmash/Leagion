import Spinner from 'react-spinkit';
import ajax from 'common/ajax';

export class AsyncBase extends React.Component {
    url = null;
    state = {};
    
    constructor(props) {
        super(props);

        let state = { isLoaded: false };
        Object.assign(this.state, state);
    }

    loaded() {
        this.setState({isLoaded: true});
    }

    componentDidMount() {
        this.updateDataset();
    }

    updateDataset() {
        ajax({
            url: this.url,
        }).then(data => {
            this.setState({leagues: data});
        });
    }

    render() {

        if (this.state.isLoaded == false) {
            return <Spinner spinnerName='three-bounce' />;
        } else {
            return this.getComponent();
        }
    }
}

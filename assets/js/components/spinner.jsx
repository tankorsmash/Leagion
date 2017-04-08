import Spinner from 'react-spinkit';

class SpinnerComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = { isLoaded: false };
    };
    loaded() {
        this.setState({isLoaded: true});
    }

    render() {

        let content;
        if (this.state.isLoaded == false) {
            return <Spinner spinnerName='three-bounce' />;
        } else {
            return this.getComponent();
        }
    }
}

module.exports = SpinnerComponent;

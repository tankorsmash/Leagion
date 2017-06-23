import Spinner from 'react-spinkit';

class SpinLoader extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {loaded: false};
    };

    loaded() {
        this.setState({loaded: true});
    }

    componentDidMount() {
        this.setState(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.setState(nextProps);
    }

    render() {

        let content;
        if (this.state.loaded == false) {
            return <Spinner spinnerName='three-bounce' />;
        } else {
            return React.Children.only(this.props.children);
        }
    }
}

module.exports = SpinLoader;

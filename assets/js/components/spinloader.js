import Spinner from 'react-spinkit';

export default class SpinLoader extends React.Component {

    constructor(props) {
        super(props);

        this.state = {loaded: false};
    }

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

        if (this.state.loaded == false) {
            return (<Spinner name='circle' fadeIn="none"/>);
        } else {
            return (
                <div>
                    {this.props.children}
                </div>
            );
        }
    }
}

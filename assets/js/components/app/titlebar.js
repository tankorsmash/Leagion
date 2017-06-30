import {Navbar} from 'reactstrap';

export default class Titlebar extends React.Component {

    toggle = () => {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    };

    render() {
        return (
			<Navbar className="titlebar" inverse>
				{this.props.title}
			</Navbar>
        );
    }
}

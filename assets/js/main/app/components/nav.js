import {Nav} from 'reactstrap';
import {Avatar} from 'components/media';
import {Dropdown} from 'components/dropdowns';

export class AppProfile extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            dropdownOpen: false
        };
    }

    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    render() {
        const {items, children} = this.props;

        return (
            <Nav className="ml-auto" navbar>
                <Dropdown caret menuRight nav
                    color="primary"
                    buttonText={
                        <Avatar size="xs" src={this.props.user.avatar_url}/>
                    }
                >
                    {children}
                </Dropdown>
            </Nav>
        );
    }
}

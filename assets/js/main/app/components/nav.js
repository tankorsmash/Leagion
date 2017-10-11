import {Nav} from 'reactstrap';
import {Dropdown, DropdownItem} from 'components/dropdowns';

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
        const {items} = this.props;

        return (
            <Nav className="ml-auto" navbar>
                <Dropdown caret menuRight nav
                    color="primary"
                    buttonText={this.props.user.email}
                >
                    {items.map((item, i) => {
                        return (<DropdownItem tag={item} key={i}></DropdownItem>);
                    })}
                </Dropdown>
            </Nav>
        );
    }
}

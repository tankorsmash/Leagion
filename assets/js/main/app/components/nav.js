import {
    NavDropdown, DropdownToggle, DropdownMenu,
    DropdownItem, Nav
} from 'reactstrap';

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
				<NavDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
					<DropdownToggle nav caret>
						{this.props.user.email}
					</DropdownToggle>
					<DropdownMenu right>
						{items.map((item, i) => {
							return (<DropdownItem tag={item} key={i}></DropdownItem>);
						})}
					</DropdownMenu>
				</NavDropdown>
            </Nav>
        );
    }
}

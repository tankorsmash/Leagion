import { Collapse, Navbar as BSNavbar, NavbarToggler,
    NavbarBrand, NavDropdown, DropdownToggle, DropdownMenu,
    DropdownItem, Nav, NavItem, NavLink
} from 'reactstrap';

class BaseAppProfile extends React.Component {
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
        return (
            <Nav className="ml-auto" navbar>
				<NavDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
					<DropdownToggle nav caret>
						{this.props.user.email}
					</DropdownToggle>
					<DropdownMenu right>
						{this.getItems().map((item, i) => {
							return (<DropdownItem tag={item} key={i}></DropdownItem>);
						})}
					</DropdownMenu>
				</NavDropdown>
            </Nav>
        )
    }
}

module.exports = {
	BaseAppProfile: BaseAppProfile,
}

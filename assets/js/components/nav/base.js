import { Collapse, Navbar, NavbarToggler, NavbarBrand } from 'reactstrap';

export class Appbar extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    render() {
        return (
            <div>
                <Navbar className="appbar" inverse toggleable>
                    <NavbarBrand href='/'>Leagion</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        {React.createElement(this.itemComponent, this.props)}
                        {React.createElement(this.profileComponent, this.props)}
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}

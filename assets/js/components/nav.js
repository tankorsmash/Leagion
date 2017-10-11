import {Collapse, Navbar as RNavbar, NavbarToggler, NavbarBrand} from 'reactstrap';
import PropTypes from 'prop-types';

export class Navbar extends React.Component {
	static propTypes = {
        ItemComponent: PropTypes.func,
        ProfileComponent: PropTypes.func,
	};

    state = {isOpen: false};

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    };

    render() {
        const {ItemComponent, ProfileComponent} = this.props;

        return (
            <div>
                <RNavbar className="legion-navbar" dark expand='sm'>
                    <NavbarBrand href='/'>Leagion</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <ItemComponent {...this.props} />
                        <ProfileComponent {...this.props} />
                    </Collapse>
                </RNavbar>
            </div>
        );
    }
}

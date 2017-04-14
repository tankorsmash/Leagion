import ajax from 'common/ajax';
import {Link} from 'react-router-dom';

import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

import { Collapse, Navbar, NavbarToggler,
    NavbarBrand, NavDropdown, DropdownToggle, DropdownMenu,
    DropdownItem, Nav, NavItem, NavLink
} from 'reactstrap';

import urls from 'common/urls';
import {LogoutButton, LoginButton} from 'components/buttons';
import auth from 'main/auth';

import {NOT_LOADED, DO_NOTHING, STOP_PROPAGATION} from 'common/constants';


const MainBar = (props) => {
    return (
        <AppBar
            title={props.title}
            onLeftIconButtonTouchTap={props.openDrawer}
        />
    )
}

class Appbar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {open: false};
    }

    handleToggle = () => this.setState({open: !this.state.open});

    handleClose = () => this.setState({open: false});

    render() {
        return (
            <div>
                <MainBar openDrawer={this.handleToggle}/>

                <Drawer
                    docked={false}
                    width={200}
                    open={this.state.open}
                    onRequestChange={(open) => this.setState({open})}
                >
					<Toolbar>
						<ToolbarGroup>
							<ToolbarTitle text="Leagion" />
						</ToolbarGroup>
					</Toolbar>
					{this.props.children}
                </Drawer>
            </div>
        );
    }
}

module.exports = {
    Appbar: Appbar
}

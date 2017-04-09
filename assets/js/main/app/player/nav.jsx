import ajax from 'common/ajax';

import {Nav, NavItem} from 'reactstrap';

import {LogoutButton, AdminButton} from 'components/buttons';
import {Navbar} from 'components/nav/base'
import {BaseAppProfile} from 'main/app/components/nav';

class PlayerItems extends React.Component {
    render() {
        return (
            <Nav navbar>
                <NavItem>
                </NavItem>
            </Nav>
        )
    }
}

class PlayerProfile extends BaseAppProfile {
	items = [AdminButton, LogoutButton];
}

class PlayerNavbar extends Navbar {
	itemComponent = PlayerItems;
	profileComponent = PlayerProfile;

}

module.exports = PlayerNavbar;

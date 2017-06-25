import ajax from 'common/ajax';

import {Nav, NavItem, NavLink as NavLinkStrap} from 'reactstrap';
import {NavLink, Link} from 'react-router-dom';

import {LogoutButton, AdminButton} from 'components/buttons';
import {Appbar} from 'components/nav/base';
import {BaseAppProfile} from 'main/app/components/nav';
import {TeamListLink} from 'components/app/team';

import teamUrls from 'main/app/player/team/urls';

const TeamLink = (props) => {
    return (
        <NavLink className="nav-link" to={teamUrls.index}>
            Teams
        </NavLink>
    )
}

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

class PlayerNavbar extends Appbar {
	itemComponent = PlayerItems;
	profileComponent = PlayerProfile;

}

module.exports = PlayerNavbar;

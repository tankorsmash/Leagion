import ajax from 'common/ajax';

import {Nav, NavItem, NavLink as NavLinkStrap} from 'reactstrap';
import {NavLink, Link} from 'react-router-dom';

import {LogoutButton, AdminButton} from 'components/buttons';
import {Navbar} from 'components/nav/base'
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
        console.log(this.props);
        return (
            <Nav navbar>
                <NavItem>
                    <NavLinkStrap tag={TeamLink} />
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

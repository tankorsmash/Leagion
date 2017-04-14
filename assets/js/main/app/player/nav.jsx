import ajax from 'common/ajax';

import {Nav, NavItem, NavLink as NavLinkStrap} from 'reactstrap';
import {NavLink, Link} from 'react-router-dom';
import {List, ListItem} from 'material-ui/List';

import {LogoutButton, AdminButton} from 'components/buttons';
import {TeamListLink} from 'components/app/team';

import teamUrls from 'main/app/player/team/urls';

const TeamLink = (props) => {
    return (
        <NavLink className="nav-link" to={teamUrls.index}>
            Teams
        </NavLink>
    )
}

class PlayerNavDrawer extends React.Component {
    render() {
		return (
			<div>
				<List>
					<ListItem primaryText="Inbox" />
					<ListItem primaryText="Starred" />
				</List>
			</div>
		)
    }
}

module.exports = PlayerNavDrawer;

import {Nav, NavItem} from 'reactstrap';

import {LogoutButton, AdminButton, AccountSettingsButton} from 'components/buttons';
import {Appbar} from 'components/nav/base';
import {BaseAppProfile} from 'main/app/components/nav';

class PlayerItems extends React.Component {
    render() {
        return (
            <Nav navbar>
                <NavItem>
                </NavItem>
            </Nav>
        );
    }
}

class PlayerProfile extends BaseAppProfile {
    getItems = () => {
        let items = [AccountSettingsButton, LogoutButton];

        if (this.props.user.is_commissioner) {
            items = [AdminButton].concat(items);
        }

        return items;
    };
}

export default class PlayerNavbar extends Appbar {
	itemComponent = PlayerItems;
	profileComponent = PlayerProfile;

}

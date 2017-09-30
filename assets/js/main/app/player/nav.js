import {Nav, NavItem} from 'reactstrap';

import {LogoutButton, AdminButton, AccountSettingsButton} from 'components/buttons';
import {Appbar} from 'components/nav/base';
import {AppProfile} from 'main/app/components/nav';

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

class PlayerProfile extends React.Component {
    getItems = () => {
        let items = [AccountSettingsButton, LogoutButton];

        if (this.props.user.is_commissioner) {
            items = [AdminButton].concat(items);
        }

        return items;
    };

    render() {
        return <AppProfile items={this.getItems()} {...this.props} />;
    }
}

export default (props) => {
    return (
        <Appbar
            itemComponent={PlayerItems}
            profileComponent={PlayerProfile}
            {...props}
        />
    );
};

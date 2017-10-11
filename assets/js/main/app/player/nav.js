import {Link} from 'react-router-dom';
import {Nav, NavItem} from 'reactstrap';
import {LogoutButton, AdminButton, AccountSettingsButton} from 'components/buttons';
import {Navbar} from 'components/nav';
import {AppProfile} from 'main/app/components/nav';
import playerUrls from 'main/app/player/urls';

class PlayerItems extends React.Component {
    render() {
        return (
            <Nav navbar>
                <NavItem>
                    <Link className="nav-link" to={playerUrls.index}>My Teams</Link>
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
        <Navbar
            {...props}
            ItemComponent={PlayerItems}
            ProfileComponent={PlayerProfile}
        />
    );
};

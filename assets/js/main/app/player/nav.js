import {Link} from 'react-router-dom';
import {Nav, NavItem} from 'reactstrap';
import {LogoutButton, AccountSettingsButton} from 'components/buttons';
import {Navbar} from 'components/nav';
import {AppProfile} from 'main/app/components/nav';
import {DropdownItem} from 'components/dropdowns';
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

const PlayerProfile = (props) => (
    <AppProfile {...props} >
        {props.user.is_commissioner &&
            <DropdownItem onClick={()=>{props.changeRole('commissioner');}}>Switch roles</DropdownItem>
        }
        <DropdownItem tag={AccountSettingsButton}></DropdownItem>
        <DropdownItem tag={LogoutButton}></DropdownItem>
    </AppProfile>
);

export default (props) => {
    return (
        <Navbar
            {...props}
            ItemComponent={PlayerItems}
            ProfileComponent={PlayerProfile}
        />
    );
};

import {Link} from 'react-router-dom';
import {Nav} from 'reactstrap';
import adminUrls from 'main/app/admin/urls';
import {LogoutButton, PlayerAppButton, AccountSettingsButton} from 'components/buttons';
import {DropdownItem} from 'components/dropdowns';
import {Navbar} from 'components/nav';
import {AppProfile} from 'main/app/components/nav';

class AdminNavItems extends React.Component {
    state = {
        createDropdownOpen: false,
    };

    toggleCreateDropdown = () => {
        this.setState({
            createDropdownOpen: !this.state.createDropdownOpen
        });
    };

    render() {
        return (
            <Nav navbar>
                <Link className="nav-link" to={adminUrls.index}>Leagues</Link>
            </Nav>
        );
    }
}

const AdminProfile = (props) => (
    <AppProfile {...props} >
        <DropdownItem tag={PlayerAppButton}></DropdownItem>
        <DropdownItem onClick={()=>{props.changeRole('player');}} tag={AccountSettingsButton}></DropdownItem>
        <DropdownItem tag={LogoutButton}></DropdownItem>
    </AppProfile>
);

export default (props) => {
    return (
        <Navbar
            {...props}
            ItemComponent={AdminNavItems}
            ProfileComponent={AdminProfile}
        />
    );
};

import {Link} from 'react-router-dom';
import {Nav} from 'reactstrap';
import adminUrls from 'main/app/admin/urls';
import {LogoutButton, PlayerAppButton} from 'components/buttons';
import {Navbar} from 'components/nav';
import {AppProfile} from 'main/app/components/nav';

class AdminNavItems extends React.Component {
    constructor(props) {
        super(props);

        this.toggleCreateDropdown = this.toggleCreateDropdown.bind(this);

        this.state = {
            createDropdownOpen: false,
        };
    }

    toggleCreateDropdown() {
        this.setState({
            createDropdownOpen: !this.state.createDropdownOpen
        });
    }

    render() {
        return (
            <Nav navbar>
                <Link className="nav-link" to={adminUrls.index}>Leagues</Link>
            </Nav>
        );
    }
}

class AdminProfile extends React.Component {
    getItems = () => {
        return [PlayerAppButton, LogoutButton];
    };

    render() {
        return <AppProfile items={this.getItems()} {...this.props} />;
    }
}

export default (props) => {
    return (
        <Navbar
            {...props}
            ItemComponent={AdminNavItems}
            ProfileComponent={AdminProfile}
        />
    );
};

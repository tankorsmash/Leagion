import {Link} from 'react-router-dom';
import {Nav} from 'reactstrap';
import adminUrls from 'main/app/admin/urls';
import {LogoutButton} from 'components/buttons';
import {Appbar} from 'components/nav/base';
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
                <Link className="nav-link" to={adminUrls.dashboard.index}> Dashboard </Link>
            </Nav>
        );
    }
}

class AdminProfile extends React.Component {
    getItems = () => {
        return [LogoutButton];
    };

    render() {
        return <AppProfile items={this.getItems()} {...this.props} />;
    }
}

export default (props) => {
    return (
        <Appbar
            itemComponent={AdminNavItems}
            profileComponent={AdminProfile}
            {...props}
        />
    );
};

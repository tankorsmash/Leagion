import PropTypes from 'prop-types';
import SpinLoader from 'components/spinloader';
import Titlebar from 'components/app/titlebar';
import {RoutedTabs} from 'components/tabs';
import ProfileForm from 'main/app/player/account/profile';
import ChangePasswordForm from 'main/app/player/account/password';

import ajax from 'common/ajax';
import urls from 'main/app/player/urls';

export class Account extends React.Component {

    static propTypes = {
        user: PropTypes.object.isRequired,
        setUserState: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);

        this.state = {
            loaded: false
        };
    }

    render() {
        return (
            <div>
                <Titlebar title="Account Settings" />
                <Tabs
                    className="account-settings-wrapper"
                    tabs={[{
                        label: 'Profile',
                        id: 'profile',
                        content: <ProfileForm {...this.props} />
                    }, {
                        label: 'Change Password',
                        id: 'change-password',
                        content: <ChangePasswordForm {...this.props} />
                    }]}
                    basePath={urls.accountIndex}
                />
            </div>
        );
    }
}

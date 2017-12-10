import PropTypes from 'prop-types';
import {Titlebar} from 'components/misc';
import {Tabs} from 'components/tabs';
import ProfileForm from 'main/app/player/account/profile';
import ChangeAvatarForm from 'main/app/player/account/avatar';
import ChangePasswordForm from 'main/app/player/account/password';

export default class AccountRouter extends React.Component {

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
                        content: <ProfileForm {...this.props} />
                    }, {
                        label: 'Avatar',
                        content: <ChangeAvatarForm
                            url={reverse('api-my-details')}
                            onSuccess={(data) => {this.props.setUserState(data);}}
                            {...this.props}
                        />
                    }, {
                        label: 'Change Password',
                        content: <ChangePasswordForm {...this.props} />
                    }]}
                />
            </div>
        );
    }
}

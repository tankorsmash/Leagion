import {Link} from 'react-router-dom';
import publicUrls from 'main/public/urls';
import adminUrls from 'main/app/admin/urls';
import accountUrls from 'main/app/player/account/urls';
import playerUrls from 'main/app/player/urls';
import auth from 'main/auth';
import {Button as RButton} from 'reactstrap';
import PropTypes from 'prop-types';

export const LogoutButton = ({...rest}) => {
	return (
		<Link {...rest} to={publicUrls.login} onClick={auth.logout}>
			Logout
		</Link>
	);
};

export const LoginButton = ({...rest}) => {
	return (
		<Link {...rest} to={publicUrls.login}>Login</Link>
	);
};

export const AdminButton = ({...rest}) => {
	return (
		<Link {...rest} to={adminUrls.index}>Manage League</Link>
	);
};

export const AccountSettingsButton = ({...rest}) => {
	return (
		<Link {...rest} to={accountUrls.index}>Profile</Link>
	);
};

export const PlayerAppButton = ({...rest}) => {
	return (
		<Link {...rest} to={playerUrls.index}>Back to my teams</Link>
	);
};

export class Button extends React.Component {
	static propTypes = {
		color: PropTypes.string,
		outline: PropTypes.bool,
		disabled: PropTypes.bool,
		block: PropTypes.bool,
		active: PropTypes.bool,
	};

	render() {
		return <RButton {...this.props}>{this.props.children}</RButton>;
	}
}

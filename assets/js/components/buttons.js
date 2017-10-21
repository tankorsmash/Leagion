import {Button as RButton} from 'reactstrap';
import {Link as RLink} from 'react-router-dom';
import publicUrls from 'main/public/urls';
import adminUrls from 'main/app/admin/urls';
import playerUrls from 'main/app/player/urls';
import auth from 'main/auth';
import PropTypes from 'prop-types';

export const LogoutButton = ({...rest}) => {
	return (
		<RLink {...rest} to={publicUrls.login} onClick={auth.logout}>
			Logout
		</RLink>
	);
};

export const LoginButton = ({...rest}) => {
	return (
		<RLink {...rest} to={publicUrls.login}>Login</RLink>
	);
};

export const AdminButton = ({...rest}) => {
	return (
		<RLink {...rest} to={adminUrls.index}>Manage League</RLink>
	);
};

export const AccountSettingsButton = ({...rest}) => {
	return (
		<RLink {...rest} to={playerUrls.accountIndex}>Profile</RLink>
	);
};

export const PlayerAppButton = ({...rest}) => {
	return (
		<RLink {...rest} to={playerUrls.index}>Back to my teams</RLink>
	);
};

export class Button extends React.Component {
	static propTypes = {
		color: PropTypes.string,
		outline: PropTypes.bool,
		disabled: PropTypes.bool,
		block: PropTypes.bool,
		active: PropTypes.bool,
        className: PropTypes.string,
		href: PropTypes.string,
	};

	render() {
		return <RButton {...this.props}>{this.props.children}</RButton>;
	}
}

export class Link extends React.Component {
    static propTypes = {
        url: PropTypes.string,
        args: PropTypes.object,
        text: PropTypes.string,
    };

	render() {
		let {url, args, children} = this.props;

		for (let key of Object.keys(args)) {
			url = url.replace(`:${key}?`, args[key]);
		}

		return (
			<RLink to={url}>
				{children}
			</RLink>
		);
	}
}

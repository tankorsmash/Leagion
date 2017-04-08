import {Link} from 'react-router-dom';
import publicUrls from 'main/public/urls';
import auth from 'main/auth';

const LogoutButton = ({...rest}) => {
	return (
		<Link {...rest} to={publicUrls.login} onClick={auth.logout}>
			Logout
		</Link>
	);
}

const LoginButton = ({...rest}) => {
	return (
		<Link {...rest} to={publicUrls.login}>Login</Link>
	);
}

module.exports = {
    LogoutButton: LogoutButton,
    LoginButton: LoginButton,
}

import {Link} from 'react-router-dom';
import urls from 'common/urls';
import auth from 'main/auth';

const LogoutButton = ({...rest}) => {
	return (
		<Link {...rest} to={urls.login} onClick={auth.logout}>
			Logout
		</Link>
	);
}

const LoginButton = ({...rest}) => {
	return (
		<Link {...rest} to={urls.login}>Login</Link>
	);
}

module.exports = {
    LogoutButton: LogoutButton,
    LoginButton: LoginButton,
}

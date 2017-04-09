import {Link} from 'react-router-dom';
import publicUrls from 'main/public/urls';
import adminUrls from 'main/app/admin/urls';
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

const AdminButton = ({...rest}) => {
	return (
		<Link {...rest} to={adminUrls.index}>Admin</Link>
	);
}

module.exports = {
    LogoutButton: LogoutButton,
    LoginButton: LoginButton,
    AdminButton: AdminButton,
}

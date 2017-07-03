import {Link} from 'react-router-dom';
import publicUrls from 'main/public/urls';
import adminUrls from 'main/app/admin/urls';
import auth from 'main/auth';

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
		<Link {...rest} to={adminUrls.index}>Admin</Link>
	);
};

import {Link} from 'react-router-dom';
import urls from 'common/urls';
import auth from 'main/auth';

const LogoutButton = ({...rest}) => {
    if (auth.loggedIn()) {
        return (
            <Link {...rest} to={urls.login} onClick={auth.logout}>
                Logout
            </Link>
        );
    } else {
        return null;
    }
}

const LoginButton = ({...rest}) => {
    if (!auth.loggedIn()) {
        return (
            <Link {...rest} to={urls.login}>Login</Link>
        );
    } else {
        return null;
    }
}

module.exports = {
    LogoutButton: LogoutButton,
    LoginButton: LoginButton,
}

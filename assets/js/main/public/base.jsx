import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {LoginForm, RegisterForm} from 'main/public/registration';
import urls from 'common/urls';

class Index extends React.Component {
    render() {
        return (
            <div>Your at the public page!</div>
        );
    }
}

class Public extends React.Component {
    render() {
        return (
			<Switch>
				<Route exact path={urls.root} component={Index} />
				<Route path={urls.login} component={LoginForm} />
				<Route path={urls.register} component={RegisterForm} />
			</Switch>
        );
    }
}

module.exports = Public;

import {BrowserRouter as Router, Switch, Redirect} from 'react-router-dom';
import {Route} from 'components/router';

import {Container, Row, Col} from 'reactstrap';

import urls from 'common/urls';
import publicUrls from 'main/public/urls';
import appUrls from 'main/app/urls';

import {RegisterForm, LoginForm} from 'main/public/registration';
import App from 'main/app/base';
import Public from 'main/public/base';
import auth from 'main/auth';

import {FourOhFour} from 'components/error-pages';

const PrivateRoute = (props) => {
    if (auth.loggedIn()) {
        return <Route {...props} />;
    } else  {
        return <Redirect to={{ pathname: publicUrls.login }}/>
    }
}

const PublicRoute = (props) => {
    if (auth.loggedIn()) {
        return <Redirect to={{ pathname: appUrls.index }}/>
    } else  {
        return <Route {...props} />;
    }
}

class Main extends React.Component {
    render() {
        return (
            <Switch>
                <PrivateRoute path={appUrls.index} component={App} />
                <PublicRoute path={publicUrls.index} component={Public}/>
                <Route component={FourOhFour} />
            </Switch>
        );

    }
}

class Base extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {

        return (
            <Router>
                <Route path={`${urls.root}`} component={Main} />
            </Router>
        );
    }
}

module.exports = {
    Base:Base,
};

import {BrowserRouter as Router, Switch, Redirect} from 'react-router-dom';
import {Route} from 'components/router';

import {Container, Row, Col} from 'reactstrap';

import publicUrls from 'main/public/urls';
import appUrls from 'main/app/urls';

import {RegisterForm} from 'main/public/registration';
import AppRouter from 'main/app/routes';
import Public from 'main/public/base';
import auth from 'main/auth';

import {FourOhFour} from 'components/error-pages';

const PrivateRoute = (props) => {
    if (auth.loggedIn()) {
        return <Route {...props} />;
    } else  {
        return <Redirect to={{ pathname: publicUrls.login }}/>;
    }
};

const PublicRoute = (props) => {
    if (auth.loggedIn()) {
        return <Redirect to={{ pathname: appUrls.index }}/>;
    } else  {
        return <Route {...props} />;
    }
};

class Main extends React.Component {
    render() {
        return (
            <Switch>
                <PrivateRoute path={appUrls.index} component={AppRouter} />
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
                <Route path={`/`} component={Main} />
            </Router>
        );
    }
}

module.exports = {
    Base: Base,
};

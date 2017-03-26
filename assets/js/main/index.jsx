import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import App from 'main/app.jsx';
import Login from 'main/registration/login';
import auth from 'main/registration/auth';
import {root} from 'common/urls';

const PrivateRoute = ({ component, ...rest }) => (
    <Route {...rest} render={props => (
        auth.loggedIn() ? (
            React.createElement(component, props)
        ) : (
            <Redirect to={{
                pathname: `/${root}/login`,
                state: { from: props.location }
            }}/>
        )
    )}/>
)

ReactDOM.render(
    <Router>
        <div>
            <Route path={`/${root}/login/`} component={Login} />
            <PrivateRoute path={`/${root}/`} component={App}/>
        </div>
    </Router>,
    document.getElementById('root')    
)

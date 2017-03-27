import React from 'react';
import ReactDOM from 'react-dom';
import {Container, Row, Col} from 'reactstrap';
import {Navbar} from 'components/nav';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import App from 'main/app.jsx';
import Login from 'main/registration/login';
import Register from 'main/registration/register';
import auth from 'main/registration/auth';
import {root, app} from 'common/urls';

const PrivateRoute = ({ component, ...rest }) => (
    <Route {...rest} render={props => (
        auth.loggedIn() ? (
            React.createElement(component, props)
        ) : (
            <Redirect to={{
                pathname: `${root}/login`,
                state: { from: props.location }
            }}/>
        )
    )}/>
)

ReactDOM.render(
    <Router>
        <div>
            <Navbar/>
            <Container>
                <Row>
                    <Col>
                        <Route path={`${root}/login/`} component={Login} />
                        <Route path={`${root}/register/`} component={Register} />
                        <PrivateRoute path={`${app}/`} component={App}/>
                    </Col>
                </Row>
            </Container>
        </div>
    </Router>,
    document.getElementById('root')    
)

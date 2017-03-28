import React from 'react';
import ReactDOM from 'react-dom';
import {Container, Row, Col} from 'reactstrap';
import {Navbar} from 'components/nav';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import App from 'main/app.jsx';
import {RegisterForm, LoginForm, auth} from 'main/registration';
import urls from 'common/urls';

const PrivateRoute = ({ component, ...rest }) => (
    <Route {...rest} render={props => (
        auth.loggedIn() ? (
            React.createElement(component, props)
        ) : (
            <Redirect to={{
                pathname: `${urls.root}/login`,
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
                        <Route path={`${urls.root}/login/`} component={LoginForm} />
                        <Route path={`${urls.root}/register/`} component={RegisterForm} />
                        <PrivateRoute path={`${urls.app}/`} component={App}/>
                    </Col>
                </Row>
            </Container>
        </div>
    </Router>,
    document.getElementById('root')    
)

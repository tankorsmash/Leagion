import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import {Container, Row, Col} from 'reactstrap';
import {Navbar} from 'components/nav';
import App from 'main/app.jsx';
import {RegisterForm, LoginForm, auth} from 'main/registration';
import urls from 'common/urls';

const PrivateRoute = ({ component, ...rest }) => (
    <Route {...rest} render={props => (
        auth.loggedIn() ? (
            React.createElement(component, props)
        ) : (
            <Redirect to={{
                pathname: urls.login,
                state: { from: props.location }
            }}/>
        )
    )}/>
)

class Public extends React.Component {
    render() {
        return (
            <div>Your at the public page!</div>
        );
    }
}

const FourOhFour = (props) => {
    return (
        <div>404</div>
    );
}

const Main = ({match}) => {
    return (
        <div>
            <Navbar />
            <Container>
                <Row>
                    <Col>
                        <main>
                            <Switch>
                                <Route exact path={urls.root} component={Public} />
                                <Route path={urls.login} component={LoginForm} />
                                <Route path={urls.register} component={RegisterForm} />
                                <PrivateRoute path={urls.app.index} component={App}/>
                                <Route component={FourOhFour} />
                            </Switch>
                        </main>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

class Index extends React.Component {
    constructor(props) {

        super(props);
        this.state = {
            //isAuthenticated: false,
        };
    }

    logout() {
        //this.setState({isAuthenticated: false});
    }

    render() {

        return (
            <Router>
                <Route path={`${urls.root}/`} component={Main} />
            </Router>
        );
    }
}


ReactDOM.render(<Index />, document.getElementById('root'));

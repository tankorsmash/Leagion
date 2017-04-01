import React from 'react';
import ReactDOM from 'react-dom';
import {Container, Row, Col} from 'reactstrap';
import {Navbar} from 'components/nav';
import {BrowserRouter as Router, Route, IndexRoute, Redirect} from 'react-router-dom';
import App from 'main/app.jsx';
import {RegisterForm, LoginForm, auth} from 'main/registration';
import {root} from 'common/urls';

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

class Public extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>Your at the public page!</div>
        );
    }
}


const Main = ({match}) => {
    return (
        <div>
            <Navbar />
            <Container>
                <Row>
                    <Col>
                        <main>
                            <Route component={Public} />
                            <Route path={`${match.url}/login`} component={LoginForm} />
                            <Route path={`${match.url}/register`} component={RegisterForm} />
                            <PrivateRoute path={`${match.url}/app/`} component={App}/>
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
            isAuthenticated: false,
        };
    }

    logout() {
        this.setState({isAuthenticated: false});
    }

    render() {

        return (
            <Router>
                <Route path={`${root}/`} component={Main} />
            </Router>
        );
    }
}


ReactDOM.render(<Index />, document.getElementById('root'));

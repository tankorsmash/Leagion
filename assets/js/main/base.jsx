import ajax from 'common/ajax';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import {Container, Row, Col} from 'reactstrap';
import {Navbar} from 'components/nav';
import {RegisterForm, LoginForm} from 'main/public/registration';
import urls from 'common/urls';
import App from 'main/app/base';
import Public from 'main/public/base';
import auth from 'main/auth'

const PrivateRoute = ({ component, ...rest }) => (
    <Route {...rest} render={props => (
        auth.loggedIn() ? (
            React.createElement(component, props)
        ) : (
            <Redirect to={{
                pathname: urls.login,
                //state: { from: props.location }
            }}/>
        )
    )}/>
)

const PublicRoute = ({ component, ...rest }) => (
    <Route {...rest} render={props => (
        auth.loggedIn() ? (
            <Redirect to={{ pathname: urls.app.index }}/>
        ) : (
            React.createElement(component, props)
        )
    )}/>
)

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
                                <PrivateRoute path={urls.app.index} component={App}/>
                                <PublicRoute path={urls.root} component={Public}/>
                                <Route component={FourOhFour} />
                            </Switch>
                        </main>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

class Base extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {

        return (
            <Router>
                <Route path={`${urls.root}/`} component={Main} />
            </Router>
        );
    }
}

module.exports = Base;


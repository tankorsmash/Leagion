import ajax from 'common/ajax';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import {Container, Row, Col} from 'reactstrap';
import {Navbar} from 'components/nav';
import {RegisterForm, LoginForm} from 'main/public/registration';
import urls from 'common/urls';
import App from 'main/app/base';
import Public from 'main/public/base';
import auth from 'main/auth'

const PrivateRoute = (props) => {
   if (auth.loggedIn()) {
       return (<Route {...props} />);
   } else  {
       return <Redirect to={{ pathname: urls.login }}/>
   }
}

const PublicRoute = (props) => {
   if (auth.loggedIn()) {
       return <Redirect to={{ pathname: urls.app.index }}/>
   } else  {
       return (<Route {...props} />);
   }
}

const FourOhFour = (props) => {
    return (
        <div>404</div>
    );
}

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {}
        };
    }

    render() {
        return (
            <div>
                <Navbar user={this.state.user}/>
                <Container>
                    <Row>
                        <Col>
                            <main>
                                <Switch>
                                    <PrivateRoute path={urls.app.index} component={App} />
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


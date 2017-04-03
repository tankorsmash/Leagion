import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import {Container, Row, Col} from 'reactstrap';

import urls from 'common/urls';
import {Navbar} from 'components/nav';

import {RegisterForm, LoginForm} from 'main/public/registration';
import App from 'main/app/base';
import Public from 'main/public/base';
import auth from 'main/auth'

const PrivateRoute = (props) => {
   if (auth.loggedIn()) {
       console.log("priv route");
       return <Route {...props} />;
   } else  {
       console.log("priv redir");
       return <Redirect to={{ pathname: urls.login }}/>
   }
}

const PublicRoute = (props) => {
   if (auth.loggedIn()) {
       console.log("redir publ");
       return <Redirect to={{ pathname: urls.app.index }}/>
   } else  {
       console.log("route publ");
       return <Route {...props} />;
   }
}

const FourOhFour = (props) => {
    return <h1>404</h1> ;
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
                                    <PrivateRoute path={urls.app.base} component={App} />
                                    <PublicRoute path={urls.root} component={Public}/>
                                    <Route path="**" component={FourOhFour} />
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
                <Route path={`${urls.root}`} component={Main} />
            </Router>
        );
    }
}

module.exports = {
    Base:Base,
    FourOhFour: FourOhFour
};

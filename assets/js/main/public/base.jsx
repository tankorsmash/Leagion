import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import {LoginForm, RegisterForm} from 'main/public/registration';

import urls from 'common/urls';
import PublicNavbar from 'main/public/nav';

class Index extends React.Component {
    render() {
        return (
            <div>You're at the public page!</div>
        );
    }
}

class Public extends React.Component {
    render() {
        return (
            <div>
                <PublicNavbar/>
                <Container>
                    <Row>
                        <Col>
                            <main>
                                <Switch>
                                    {/* <Route exact path={urls.root} component={Index} /> */}
                                    <Route path={urls.login} component={LoginForm} />
                                    <Route path={urls.register} component={RegisterForm} />
                                </Switch>
                            </main>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

module.exports = Public;

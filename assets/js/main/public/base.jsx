import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {Container, Row, Col} from 'reactstrap';

import {LoginForm, RegisterForm} from 'main/public/registration';

import publicUrls from 'main/public/urls';
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
                                    <Route path={publicUrls.login} component={LoginForm} />
                                    <Route path={publicUrls.register} component={RegisterForm} />
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

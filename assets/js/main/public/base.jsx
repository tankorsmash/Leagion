import {BrowserRouter as Router, Switch, Redirect} from 'react-router-dom';
import {Route} from 'components/router';

import {Container, Row, Col} from 'reactstrap';

import {LoginForm, RegisterForm} from 'main/public/registration';

import publicUrls from 'main/public/urls';

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
                <Container>
                    <Row>
                        <Col>
                            <main>
                                <Switch>
                                    {/* <Route exact path='/' component={Index} /> */}
                                    <Route path={publicUrls.login} component={LoginForm} />
                                    <Route path={publicUrls.register} component={RegisterForm} />
                                    <Redirect to={publicUrls.login} />
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

import React from 'react';
import ReactDOM from 'react-dom';
import { Container, Row, Col } from 'reactstrap';
import {LoginForm, RegisterForm} from 'public/registration';
import {Navbar} from 'components/nav';

class Public extends React.Component {
    render() {
        return (
            <div>
                <Navbar/>
                <Container>
                    <Row>
                        <Col>
                            <RegisterForm/>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

ReactDOM.render(<Public/>, document.getElementById('root'));


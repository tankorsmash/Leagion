import React from 'react';
import ReactDOM from 'react-dom';
import { Container, Row, Col } from 'reactstrap';
import {LoginForm, RegisterForm} from 'public/registration';

class Public extends React.Component {
    render() {
        return (
            <Row>
                <Col lg={{ size: 6, push: 2, pull: 2, offset: 1 }}>
                    <RegisterForm/>
                </Col>
            </Row>
        );
    }
}

ReactDOM.render(<Public/>, document.getElementById('root'));


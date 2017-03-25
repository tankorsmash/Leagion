import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import reverse from 'common/reverse';

class Login extends React.Component {
    render() {
        return (
            <Form inline action={reverse('knox-login')}>
                <FormGroup>
                    <Label for="loginEmail">Email</Label>
                    <Input type="email" name="email" id="loginEmail" />
                </FormGroup>
                <FormGroup>
                    <Label for="loginPassword">Password</Label>
                    <Input type="password" name="password" id="loginPassword" />
                </FormGroup>
                <Button>Log In</Button>
            </Form>
        );
    }
}

module.exports = {
    Login: Login
}


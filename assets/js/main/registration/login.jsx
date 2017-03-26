import reverse from 'common/reverse';
import React from 'react';
import {FormBase} from 'components/forms';
import {Button, Form, FormGroup, Label, Input} from 'reactstrap';
import {fetchInfo} from 'common/default';

class LoginForm extends FormBase {
    render() {
        return (
            <Form inline>
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

module.exports = LoginForm;


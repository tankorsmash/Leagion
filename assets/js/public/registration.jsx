import React from 'react';
import {FormBase} from 'components/forms';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import reverse from 'common/reverse';

class RegisterForm extends FormBase {
    constructor(props) {
        super(props);
        this.state = {
            'email': '',
            'password': '',
            'password2': ''
        };
    }

    handleSubmit(event) {
        event.preventDefault();
        //console.log(reverse);

        fetch(reverse('register'), {
            method: 'post'
        }).then(function(response) {
            console.log(response);

        }).catch(function(err) {
            console.log(err);
        });
    }

    render() {
        return (
            <Form inline onSubmit={this.handleSubmit}>
                <FormGroup>
                    <Label for="registerEmail">Email</Label>
                    <Input type="email" name="email" id="registerEmail" value={this.state.email} onChange={this.handleInputChange}/>
                </FormGroup>
                <FormGroup>
                    <Label for="loginPassword">Password</Label>
                    <Input type="password" name="password" id="registerPassword" value={this.state.password} onChange={this.handleInputChange}/>
                </FormGroup>
                <FormGroup>
                    <Label for="loginPassword2">Password Again</Label>
                    <Input type="password" name="password2" id="registerPassword2" value={this.state.password2} onChange={this.handleInputChange}/>
                </FormGroup>
                <Button type='submit' value='Submit'>Register</Button>
            </Form>
        );
    }
}

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

module.exports = {
    RegisterForm: RegisterForm,
    LoginForm: LoginForm
}


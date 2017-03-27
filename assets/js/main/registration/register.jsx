import reverse from 'common/reverse';
import React from 'react';
import {Redirect} from 'react-router-dom';
import {FormBase} from 'components/forms';
import {Button, Form, FormGroup, Label, Input} from 'reactstrap';
import {fetchInfo} from 'common/default';
import {app} from 'common/urls';
import auth from 'main/registration/auth';

class RegisterForm extends FormBase {
    constructor(props) {

        super(props);
        this.state = {
            'email': '',
            'password1': '',
            'password2': ''
        };
    }

    handleSubmit(event) {
        event.preventDefault();

		let info = Object.assign({}, fetchInfo, {
			method: 'POST',
			body: JSON.stringify(this.state)
		});

		fetch(reverse('rest_register'), info)
			.then(r => r.json())
			.then(data => {
				auth.login(data.token);
			})
    }

    render() {
		if (auth.loggedIn()) {
			return (<Redirect to={app} />)
		}

        return (
            <Form onSubmit={this.handleSubmit}>
                <FormGroup>
                    <Label for="registerEmail">Email</Label>
                    <Input type="email" name="email" id="registerEmail" value={this.state.email} onChange={this.handleInputChange}/>
                </FormGroup>
                <FormGroup>
                    <Label for="loginPassword">Password</Label>
                    <Input type="password" name="password1" id="registerPassword1" value={this.state.password1} onChange={this.handleInputChange}/>
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

module.exports = RegisterForm;

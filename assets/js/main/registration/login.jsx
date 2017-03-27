import reverse from 'common/reverse';
import React from 'react';
import {Link} from 'react-router-dom';
import {FormBase} from 'components/forms';
import {Button, Form, FormGroup, Label, Input} from 'reactstrap';
import {fetchInfo} from 'common/default';
import {root} from 'common/urls';

class LoginForm extends FormBase {
    constructor(props) {

        super(props);
        this.state = {
            'email': '',
            'password': '',
        };
    }

    handleSubmit(event) {
        event.preventDefault();
        //console.log(reverse);

        fetchInfo.method = 'POST';
        fetchInfo.body = JSON.stringify(this.state);

        fetch(reverse('rest_register'), fetchInfo)
            .then(function(response) {
                console.log(response);
            }).catch(function(err) {
                console.log(err);
        });
    }

    render() {
        return (
            <Form>
                <FormGroup>
                    <Label for="loginEmail">Email</Label>
                    <Input type="email" name="email" id="loginEmail" />
                </FormGroup>
                <FormGroup>
                    <Label for="loginPassword">Password</Label>
                    <Input type="password" name="password" id="loginPassword" />
                </FormGroup>
                <Button>Log In</Button>
                <Link to={`${root}/register`}>Register</Link>
            </Form>
        );
    }
}

module.exports = LoginForm;


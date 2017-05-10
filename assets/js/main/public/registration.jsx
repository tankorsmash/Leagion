import {Redirect, Link} from 'react-router-dom';
import {FormBase} from 'components/forms';
import {Button, Form, FormGroup, Label, Input} from 'reactstrap';
import ajax from 'common/ajax';
import appUrls from 'main/app/urls';
import publicUrls from 'main/public/urls';
import auth from 'main/auth';

class RegisterBase extends FormBase {
    handleSubmit(event) {
        event.preventDefault();

        ajax({
            url: reverse(this.url),
            requireLogin: false,
			method: 'POST',
            data: this.state.form,
        }).then(data => {
            auth.login(data.key);
            this.forceUpdate();
        }).catch(data => {
            toastr.error(data.non_field_errors);
        });

    }

    render() {
		if (auth.loggedIn()) {
			return (<Redirect to={appUrls.index} />)
        } else {
            return this.getForm();
        }
    }

}

class RegisterForm extends RegisterBase {
    url = 'rest_register';

    constructor(props) {

        super(props);
        this.state = {
            form: {
                'email': '',
                'password1': '',
                'password2': ''
            }
        };
    }


    getForm() {
        return (
            <Form onSubmit={this.handleSubmit}>
                <FormGroup>
                    <Label for="registerEmail">Email</Label>
                    <Input type="email" name="email" id="registerEmail" value={this.state.form.email} onChange={this.handleInputChange}/>
                </FormGroup>
                <FormGroup>
                    <Label for="loginPassword">Password</Label>
                    <Input type="password" name="password1" id="registerPassword1" value={this.state.form.password1} onChange={this.handleInputChange}/>
                </FormGroup>
                <FormGroup>
                    <Label for="loginPassword2">Password Again</Label>
                    <Input type="password" name="password2" id="registerPassword2" value={this.state.form.password2} onChange={this.handleInputChange}/>
                </FormGroup>
                <Button type='submit' value='Submit'>Register</Button>
            </Form>
        );
    }
}

class LoginForm extends RegisterBase {
    url = 'rest_login';

    constructor(props) {

        super(props);
        this.state = {
            form: {
                'email': '',
                'password': '',
            }
        };
    }

    getForm() {
        return (
            <Form onSubmit={this.handleSubmit}>
                <FormGroup>
                    <Label for="loginEmail">Email</Label>
                    <Input type="email" name="email" id="loginEmail" value={this.state.form.email} onChange={this.handleInputChange} />
                </FormGroup>
                <FormGroup>
                    <Label for="loginPassword">Password</Label>
                    <Input type="password" name="password" id="loginPassword" value={this.state.form.password} onChange={this.handleInputChange} />
                </FormGroup>
                <Button type="submit">Log In</Button>
                <Link to={publicUrls.register}>Register</Link>
            </Form>
        );
    }
}

module.exports = {
    RegisterForm: RegisterForm,
    LoginForm: LoginForm,
    auth: auth
};

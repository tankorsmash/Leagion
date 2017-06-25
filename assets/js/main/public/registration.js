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
            return (
                <div className="full-screen d-flex registration-wrapper">
                    <div className="registration-box">
                        {this.getForm()}
                    </div>
                </div>
            );
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
                <h5 className="text-center">Sign in and get going!</h5>
                <br />
                <FormGroup>
                    <div className="inner-addon left-addon">
                        <i className="fa fa-user" aria-hidden="true"></i>
                        <Input placeholder="john.doe@example.com" type="email" name="email" id="loginEmail" value={this.state.form.email} onChange={this.handleInputChange} />
                    </div>
                </FormGroup>
                <FormGroup>
                    <div className="inner-addon left-addon">
                        <i className="fa fa-lock" aria-hidden="true"></i>
                        <Input type="password" name="password" id="loginPassword" value={this.state.form.password} onChange={this.handleInputChange} />
                    </div>
                </FormGroup>
                <FormGroup check className="d-flex justify-content-between">
                    <Label check>
                        <Input type="checkbox" />
                        Remember me
                    </Label>
                    <Link to={publicUrls.passwordReset}>Forgot Password?</Link>
                </FormGroup>
                <Button color="primary" block type="submit">Log In</Button>
            </Form>
        );
    }
}

module.exports = {
    RegisterForm: RegisterForm,
    LoginForm: LoginForm,
    auth: auth
};

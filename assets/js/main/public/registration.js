import {Redirect, Link} from 'react-router-dom';
import {Form, FormGroup, FormGroupWrap} from 'components/forms';
import {
    Button,
    Label as RLabel,
    Input as RInput,
} from 'reactstrap';
import ajax from 'common/ajax';
import appUrls from 'main/app/urls';
import publicUrls from 'main/public/urls';
import auth from 'main/auth';

class LoginForm extends React.Component {
    handleSubmit = (form, setErrors) => {
        ajax({
            url: reverse('rest_login'),
            requireLogin: false,
            method: 'POST',
            data: form,
        }).then(data => {
            auth.login(data.key);
            this.forceUpdate();
        }).catch(data => {
            toastr.error("Email and Password do not match. Please try again.");
        });
    };

    render() {
        if (auth.loggedIn()) {
            return (<Redirect to={appUrls.index} />);
        } else {
            return (
                <div className="full-screen d-flex registration-wrapper">
                    <div className="registration-box">
                        <Form
                            onSubmit={this.handleSubmit}
                            form={{
                                'email': '',
                                'password': '',
                            }}
                        >
                            <h5 className="text-center">Sign in and get going!</h5>
                            <br />
                            <FormGroup forminput
                                placeholder="john.doe@example.com"
                                type="email"
                                label="Email"
                                id="email"
                            />
                            <FormGroup forminput
                                type="password"
                                label="Password"
                                id="password"
                            />
                            <FormGroupWrap forminput check className="d-flex justify-content-between">
                                <RLabel check>
                                    <RInput type="checkbox" />
                                    Remember me
                                </RLabel>
                                <Link to={publicUrls.passwordReset}>Forgot Password?</Link>
                            </FormGroupWrap>
                            <Button color="primary" block type="submit">Log In</Button>
                        </Form>
                    </div>
                </div>
            );
        }
    }
}

module.exports = {
    LoginForm: LoginForm,
    auth: auth
};

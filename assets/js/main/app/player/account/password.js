import PropTypes from 'prop-types';
import {Button, Form, Label, Input} from 'reactstrap';
import {FormBase, FormGroup} from 'components/forms';
import ajax from 'common/ajax';

export default class ChangePasswordForm extends FormBase {
    url = 'rest_password_change';

    form = {
        'old_password': '',
        'new_password1': '',
        'new_password2': '',
    };

    constructor(props) {
        super(props);
        this.state = {
            form: this.form,
            errors: {},
        };
    }

	componentWillReceiveProps(nextProps) {
		this.setState({
            form: this.form,
		});
	}

    handleSubmit(event) {
        event.preventDefault();

        ajax({
            url: reverse(this.url),
            requireLogin: true,
			method: 'POST',
            data: this.state.form,
        }).then(data => {
            toastr.success('Password successfully changed!');
        }).catch(data => {
            this.handleErrors(data);
        });

    }

    render() {
		return (
            <Form onSubmit={this.handleSubmit}>
                <FormGroup
                    label="Old Password"
                    type="password"
                    id="old_password"
                    value={this.state.form.old_password}
                    onChange={this.handleInputChange}
                    error={this.state.errors.old_password}
                />
                <FormGroup
                    label="New Password"
                    type="password"
                    id="new_password1"
                    value={this.state.form.new_password1}
                    onChange={this.handleInputChange}
                    error={this.state.errors.new_password1}
                />
                <FormGroup
                    label="Confirm New Password"
                    type="password"
                    id="new_password2"
                    value={this.state.form.new_password2}
                    onChange={this.handleInputChange}
                    error={this.state.errors.new_password2}
                />
                <div className="text-center">
                    <Button type='submit' value='Submit'>Change Password</Button>
                </div>
            </Form>
		);
    }

}

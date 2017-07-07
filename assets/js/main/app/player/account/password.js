import PropTypes from 'prop-types';
import {Button, Form, FormGroup, Label, Input} from 'reactstrap';
import {FormBase} from 'components/forms';
import ajax from 'common/ajax';

export default class ChangePasswordForm extends FormBase {
    url = 'rest_password_change';

    constructor(props) {
        super(props);
        this.state = {
            form: {
                'old_password': '',
                'new_password1': '',
                'new_password2': '',
            }
        };
    }

	componentWillReceiveProps(nextProps) {
		this.setState({
            form: {
                'old_password': '',
                'new_password1': '',
                'new_password2': '',
            }
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
            toastr.error(data.non_field_errors);
        });

    }

    render() {
		return (
            <Form onSubmit={this.handleSubmit}>
                <FormGroup>
                    <Label for="old_password">Old Password</Label>
                    <Input type="password" name="old_password" id="old_password" value={this.state.form.old_password} onChange={this.handleInputChange}/>
                </FormGroup>
                <FormGroup>
                    <Label for="new_password1">New Password</Label>
                    <Input type="password" name="new_password1" id="new_password1" value={this.state.form.new_password1} onChange={this.handleInputChange}/>
                </FormGroup>
                <FormGroup>
                    <Label for="new_password2">Confirm New Password</Label>
                    <Input type="password" name="new_password2" id="new_password2" value={this.state.form.new_password2} onChange={this.handleInputChange}/>
                </FormGroup>
                <div className="text-center">
                    <Button type='submit' value='Submit'>Change Password</Button>
                </div>
            </Form>
		);
    }

}

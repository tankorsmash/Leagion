import PropTypes from 'prop-types';
import {Button, Label, Input} from 'reactstrap';
import {Form, FormGroup} from 'components/forms';
import ajax from 'common/ajax';

export default class ChangePasswordForm extends React.Component {
    onSubmit(form, setErrors) {
        ajax({
            url: reverse('rest_password_change'),
            requireLogin: true,
			method: 'POST',
            data: form,
        }).then(data => {
            toastr.success('Password successfully changed!');
            setErrors({});
        }).catch(data => {
            setErrors(data);
        });

    }

    render() {
		return (
            <Form
                onSubmit={this.onSubmit}
                form={{
                    'old_password': '',
                    'new_password1': '',
                    'new_password2': '',
                }}
            >
                <FormGroup forminput label="Old Password" type="password" id="old_password" />
                <FormGroup forminput label="New Password" type="password" id="new_password1" />
                <FormGroup forminput label="Confirm New Password" type="password" id="new_password2" />
                <div className="text-center">
                    <Button type='submit' value='Submit'>Change Password</Button>
                </div>
            </Form>
		);
    }

}

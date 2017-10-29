import PropTypes from 'prop-types';
import {Button, Label, Input} from 'reactstrap';
import {Form, FormGroup} from 'components/forms';
import ajax from 'common/ajax';

export default class ProfileForm extends React.Component {
    static propTypes = {
        user: PropTypes.object.isRequired,
    };

    onSubmit(form, setErrors) {
        event.preventDefault();

        ajax({
            url: reverse('api-my-details'),
            requireLogin: true,
            method: 'PATCH',
            data: form,
        }).then(data => {
            toastr.success('Profile information successfully changed!');
            this.props.setUserState(data);
        }).catch(data => {
            setErrors(data);
        });

    }

    render() {
        return (
            <Form
                onSubmit={this.onSubmit}
                form={{
                    'email': this.props.user.email,
                    'first_name': this.props.user.first_name,
                    'last_name': this.props.user.last_name,
                    'default_phonenumber': this.props.user.default_phonenumber,
                    'alt_phonenumber': this.props.user.alt_phonenumber,
                }}
            >
                <FormGroup label="Email" type="email" id="email" />
                <FormGroup label="First Name" type="text" id="first_name" />
                <FormGroup label="Last Name" type="text" id="last_name" />
                <FormGroup label="Phone Number" type="text" id="default_phonenumber" />
                <FormGroup label="Alternate Phone Number" type="text" id="alt_phonenumber" />
                <div className="text-center">
                    <Button type='submit' value='Submit'>Save</Button>
                </div>
            </Form>
        );
    }

}

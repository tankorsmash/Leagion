import PropTypes from 'prop-types';
import {Button} from 'reactstrap';
import {Form, FormGroup, FormGroupWrap} from 'components/forms';
import ajax from 'common/ajax';

export default class ProfileForm extends React.Component {
    static propTypes = {
        user: PropTypes.object.isRequired,
    };

    onSubmit(form, setErrors) {
        ajax({
            url: reverse('api-my-details'),
            requireLogin: true,
            method: 'PATCH',
            data: form,
        }).then(data => {
            toastr.success('Profile information successfully changed!');
            this.props.setUserState(data);
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
                    'email': this.props.user.email,
                    'first_name': this.props.user.first_name,
                    'last_name': this.props.user.last_name,
                    'default_phonenumber': this.props.user.default_phonenumber,
                    'alt_phonenumber': this.props.user.alt_phonenumber,
                }}
                className=""
            >
                <FormGroup forminput label="Email" type="email" id="email" />
                <FormGroupWrap forminput row>
                    <FormGroup forminput className="col-md-6" label="First Name" type="text" id="first_name" />
                    <FormGroup forminput className="col-md-6" label="Last Name" type="text" id="last_name" />
                </FormGroupWrap>
                <FormGroup forminput label="Phone Number" type="text" id="default_phonenumber" />
                <FormGroup forminput label="Alternate Phone Number" type="text" id="alt_phonenumber" />
                <FormGroupWrap forminput className="text-center">
                    <Button type='submit' value='Submit'>Save</Button>
                </FormGroupWrap>
            </Form>
        );
    }

}

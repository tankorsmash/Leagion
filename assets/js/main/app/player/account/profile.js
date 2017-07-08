import PropTypes from 'prop-types';
import {Button, Form, Label, Input} from 'reactstrap';
import {FormBase, FormGroup} from 'components/forms';
import ajax from 'common/ajax';

export default class ProfileForm extends FormBase {
	static propTypes = {
		user: PropTypes.object.isRequired,
	};

    url = 'api-my-details';

    constructor(props) {
        super(props);
        this.state = {
            form: {
                'email': this.props.user.email,
                'default_phonenumber': this.props.user.default_phonenumber,
                'alt_phonenumber': this.props.user.alt_phonenumber,
            },
            errors: {},
        };
    }

    handleSubmit(event) {
        event.preventDefault();

        ajax({
            url: reverse(this.url),
            requireLogin: true,
			method: 'PATCH',
            data: this.state.form,
        }).then(data => {
            toastr.success('Profile information successfully changed!');
			this.props.setUserState(data);
        }).catch(data => {
            this.handleErrors(data);
        });

    }

    render() {
		return (
            <Form onSubmit={this.handleSubmit}>
                <FormGroup
                    label="Email"
                    type="email"
                    id="email"
                    value={this.state.form.email}
                    onChange={this.handleInputChange}
                    error={this.state.errors.email}
                />
                <FormGroup
                    label="Phone Number"
                    type="text"
                    id="default_phonenumber"
                    value={this.state.form.default_phonenumber}
                    onChange={this.handleInputChange}
                    error={this.state.errors.default_phonenumber}
                />
                <FormGroup
                    label="Alternate Phone Number"
                    type="text"
                    id="alt_phonenumber"
                    value={this.state.form.alt_phonenumber}
                    onChange={this.handleInputChange}
                    error={this.state.errors.alt_phonenumber}
                />
                <div className="text-center">
					<Button type='submit' value='Submit'>Save</Button>
				</div>
            </Form>
		);
    }

}

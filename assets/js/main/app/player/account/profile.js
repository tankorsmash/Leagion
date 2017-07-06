import PropTypes from 'prop-types';
import {Button, Form, FormGroup, Label, Input} from 'reactstrap';
import {FormBase} from 'components/forms';
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
                'email': '',
                'default_phonenumber': '',
                'alt_phonenumber': '',
            }
        };
    }

	componentWillReceiveProps(nextProps) {
		this.setState({
            form: {
                'email': nextProps.user.email,
                'default_phonenumber': nextProps.user.default_phonenumber,
                'alt_phonenumber': nextProps.user.alt_phonenumber,
            }
		});
	}

    handleSubmit(event) {
        event.preventDefault();

        ajax({
            url: reverse(this.url),
            requireLogin: true,
			method: 'PATCH',
            data: this.state.form,
        }).then(data => {
			console.log(data);
            this.forceUpdate();
        }).catch(data => {
            toastr.error(data.non_field_errors);
        });

    }

    render() {
		return (
            <Form onSubmit={this.handleSubmit}>
                <FormGroup>
                    <Label for="registerEmail">Email</Label>
                    <Input type="email" name="email" id="email" value={this.state.form.email} onChange={this.handleInputChange}/>
                </FormGroup>
                <FormGroup>
                    <Label for="loginPassword">Phone Number</Label>
                    <Input type="text" name="default_phonenumber" id="default_phonenumber" value={this.state.form.default_phonenumber} onChange={this.handleInputChange}/>
                </FormGroup>
                <FormGroup>
                    <Label for="loginPassword2">Alternate Phone Number</Label>
                    <Input type="text" name="alt_phonenumber" id="alt_phonenumber" value={this.state.form.alt_phonenumber} onChange={this.handleInputChange}/>
                </FormGroup>
                <Button type='submit' value='Submit'>Save</Button>
            </Form>
		);
    }

}

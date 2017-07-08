import {FormGroup as BootstrapFormGroup, Label, Input, FormFeedback} from 'reactstrap';
import update from 'immutability-helper';

export class FormBase extends React.Component {
    constructor(props) {
        super(props);
		this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

	handleInputChange(event) {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;

		this.setState({
			form: update(this.state.form, {[name]: {value: { $set: value }}}),
		});
	}

	handleErrors(response) {
		this.setState({
			errors: response,
		});
	}

	handleSubmit(event) {
		throw 'you must override handleSubmit method when making a form';
	}
}

export class FormGroup extends React.Component {
	render() {
		return (
			<BootstrapFormGroup color={this.props.error ? 'danger' : ''}>
				<Label for={this.props.id}>{this.props.label}</Label>
				<Input
					type={this.props.type}
					name={this.props.id}
					id={this.props.id}
					value={this.props.value}
					onChange={this.props.onChange}
					state={this.props.error ? 'danger' : ''}
				/>
				<FormFeedback>{this.props.error || ''}</FormFeedback>
			</BootstrapFormGroup>
		);
	}
}

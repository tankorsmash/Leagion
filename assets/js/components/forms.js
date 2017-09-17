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

        this.updateFormData(name, value);
	}

    // lets us update form data without needing to go through an event, like 'change'
    updateFormData = (name, value, onStateUpdated) => {
        console.log("updateFormData", name, value);
        this.setState({
            form: {
                ...this.state.form,
                [name]: value
            }
        }, onStateUpdated);
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

export class StaticRow extends React.Component {

	render() {
		return (
			<div className="form-group row">
				<label className="col-sm-6 col-form-label text-sm-left text-center">{this.props.label}</label>
				<div className="col-sm-6 text-sm-right text-center">
					<p className="form-control-static">{this.props.value}</p>
				</div>
			</div>
		);
	}
}

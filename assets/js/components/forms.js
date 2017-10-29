import update from 'immutability-helper';
import PropTypes from 'prop-types';
import {
    FormGroup as BootstrapFormGroup,
    Form as RForm,
    Label, Input, FormFeedback
} from 'reactstrap';
import {withState, withHandlers, setPropTypes, compose} from 'recompose';

const enhance = compose(
    setPropTypes({
        onSubmit: PropTypes.func.isRequired,
        onStateUpdated: PropTypes.func,
    }),
    withState('form', 'setForm', (props) => props.form),
    withState('errors', 'setErrors', {}),
    withHandlers({
        onInputChange: props => event => {
            const target = event.target;
            const value = target.type === 'checkbox' ? target.checked : target.value;
            const name = target.name;

            props.setForm((f) => {
                return update(f, {[name]: {$set: value}});
            });
        },
        onFormSubmit: props => event => {
            event.preventDefault();
            props.onSubmit(props.form, props.setErrors);
        },
        setErrors: () => response => {
            this.setState({ errors: response});
        },
    }),
);
export const Form = enhance(({children, onFormSubmit, onInputChange, form, errors}) => {
    const childrenWithProps = React.Children.map(children, (child) => {
        if (child.type.name == 'FormGroup') {
            return React.cloneElement(child, {
                onChange: onInputChange,
                value: form[child.props.id],
                error: errors[child.props.id],
            });
        } else {
            return child;
        }
    });

    return (
        <RForm onSubmit={onFormSubmit}>
            {childrenWithProps}
        </RForm>
    );
});

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

        this.updateFormState({
            [name]: value
        });
    }

    // lets us update form data without needing to go through an event, like 'change'
    updateFormState = (newFormState, onStateUpdated) => {
        this.setState((prevState, props) => {
            return {
                form: {
                    ...prevState.form,
                    ...newFormState
                }
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
                    valid={!this.props.error}
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

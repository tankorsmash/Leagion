import update from 'immutability-helper';
import PropTypes from 'prop-types';
import {
    FormGroup as RFormGroup,
    Form as RForm,
    Label, Input, FormFeedback
} from 'reactstrap';
import {defaultProps, withState, withHandlers, setPropTypes, compose} from 'recompose';
import {uuid4} from 'common/utils';

const enhance = compose(
    setPropTypes({
        onSubmit: PropTypes.func.isRequired,
        onErrors: PropTypes.func,
        onSuccess: PropTypes.func,
        onStateUpdated: PropTypes.func,
        id: PropTypes.string,
    }),
    defaultProps({id: uuid4()}),
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
            props.onSubmit(props.form, props.setErrors, props.setSuccess);
        },
        setErrors: props => response => {
            this.setState({ errors: response});
            props.onError();
        },
        setSuccess: props => response => {
            this.setState({ errors: {}});
            props.onSuccess();
        },
    }),
);
export const Form = enhance(({id, children, onFormSubmit, onInputChange, form, errors}) => {
    const childrenWithProps = React.Children.map(children, (child) => {
        if (child.type && ['FormGroup', 'Input'].includes(child.type.name)) {
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
        <RForm onSubmit={onFormSubmit} id={id}>
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

export const FormGroup = (props) => {
    const {
        id, label, type, value, onChange, error, children,
        className, placeholder
    } = props;
    const childrenWithProps = React.Children.map(children, (child) => {
        if (child.type && child.type.name == 'Input') {
            return React.cloneElement(child, {
                onChange: onChange,
                value: value,
                error: error,
            });
        } else {
            return child;
        }
    });

    return (
        <RFormGroup
            className={className}
            color={error ? 'danger' : ''}
        >
            {childrenWithProps}
            {label && id &&
                <Label for={id}>{label}</Label>
            }
            <Input
                type={type}
                name={id}
                id={id}
                value={value}
                onChange={onChange}
                valid={!error}
                placeholder={placeholder}
            />
            <FormFeedback>{error || ''}</FormFeedback>
        </RFormGroup>
    );
};

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

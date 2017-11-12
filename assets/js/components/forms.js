import {withState, withHandlers, setPropTypes, compose} from 'recompose';
import update from 'immutability-helper';
import PropTypes from 'prop-types';
import Datetime from 'react-datetime';
import moment from 'moment';
import {
    FormGroup as RFormGroup,
    Form as RForm,
    Label, Input, FormFeedback
} from 'reactstrap';

import {DATE_FORMAT} from 'common/constants';

const enhance = compose(
    setPropTypes({
        onSubmit: PropTypes.func.isRequired,
        onErrors: PropTypes.func,
        onSuccess: PropTypes.func,
        onStateUpdated: PropTypes.func,
        id: PropTypes.string,
        className: PropTypes.string,
    }),
    withState('form', 'setForm', (props) => props.form),
    withState('errors', 'setErrors', {}),
    withHandlers({
        onInputChange: props => e => {
            let name, value;
            if (e.target) {
                const target = e.target;
                value = target.type === 'checkbox' ? target.checked : target.value;
                name = target.name;
            } else {
                name = e.name;
                value = e.value;
            }
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
export const Form = enhance(({className, id, children, onFormSubmit, onInputChange, form, errors}) => {
    const childrenWithProps = React.Children.map(children, (child) => {
        if (child.type && ['FormGroup', 'FormGroupWrap'].includes(child.type.name)) {
            return React.cloneElement(child, {
                onChange: onInputChange,
                form,
                errors,
            });
        } else {
            return child;
        }
    });

    return (
        <RForm onSubmit={onFormSubmit} id={id} className={className}>
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
        id, label, type, onChange, form, errors,
        className, placeholder, check, row, inline, disabled,
        tag, children
    } = props;

    let {name, value} = props;
    if (type !== 'radio') {
        name = id;
    }

    //populate values and errors from form object but not if
    //explicitly passed in (i.e. for radios)
    if (!value) {
        value = form[name];
    }
    const error = errors[name];

    const checkOrRadio = ['checkbox', 'radio'].includes(type);
    const isDatePicker = type === 'date';

    //handle checkbox and radio initial values
    let checked;
    if (type === 'radio') {
        checked = value === form[name];
    } else if (type === 'checkbox') {
        checked = value;
    } else if (type === 'date') {

    }

    const select = type === 'select';

    return (
        <RFormGroup
            row={row}
            check={check}
            inline={inline}
            disabled={disabled}
            tag={tag}
            className={className}
            color={error ? 'danger' : ''}
        >
            { checkOrRadio && (
                <Label check>
                    <Input checked={checked} type={type} name={name} id={id} value={value} onChange={onChange} valid={!error} placeholder={placeholder} />
                    {label}
                </Label>
            )}
            { !checkOrRadio &&
                <Label check={check} for={id}>{label}</Label>
            }
            { !checkOrRadio && !isDatePicker &&
                <Input
                    type={type} name={name} id={id} value={value}
                    onChange={onChange} valid={!error} placeholder={placeholder}
                >
                    {children}
                </Input>
            }
            { isDatePicker &&
                <DatePicker
                    className={error ? 'is-invalid' : 'is-valid'} onChange={onChange}
                    value={value} type={type} name={name} id={id} placeholder={placeholder}
                />
            }
            <FormFeedback>{error || ''}</FormFeedback>
        </RFormGroup>
    );
};

export const FormGroupWrap = (props) => {
    const {errors, form, onChange, className} = props;
    const childrenWithProps = React.Children.map(props.children, (child) => {
        if (child.type && ['FormGroup', 'FormGroupWrap'].includes(child.type.name)) {
            return React.cloneElement(child, { errors, form, onChange });
        } else {
            return child;
        }
    });

    const classNames = `le-form-group-wrap ${className}`;

    return (
        <RFormGroup className={classNames} {...props} >
            {childrenWithProps}
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

export const DatePicker = (props) => {
    const {
        onChange, value, name, id, placeholder
    } = props;
    const className = 'form-control ' + props.className;

    const onDateChange = moment => {
        const value = moment.format(DATE_FORMAT);
        onChange({name, value});
    };

    return (
        <Datetime
            dateFormat={DATE_FORMAT}
            timeFormat={false}
            closeOnSelect={true}
            onChange={onDateChange}
            inputProps={{
                name, id, placeholder, className, onChange, value,
                readOnly: true,
            }}
        />
    );
};

export const TimePicker = (props) => {
    return (
        <Datetime
            dateFormat={false}
            {...props}
        />
    );
};

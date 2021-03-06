import {setDisplayName, withState, withHandlers, setPropTypes, lifecycle, compose} from 'recompose';
import update from 'immutability-helper';
import Select from 'react-select';
import PropTypes from 'prop-types';
import Datetime from 'react-datetime';
import FontAwesome from 'react-fontawesome';
import {
    FormGroup as RFormGroup,
    Form as RForm,
    Input as RInput,
    Label, FormFeedback,
    InputGroup, InputGroupButton,
} from 'reactstrap';

import {MapWithASearchBox} from 'components/map';
import {DATE_FORMAT} from 'common/constants';
import {onKeyPress} from 'common/functions';
import {Button} from 'components/buttons';

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
export const Form = enhance(({className, id, children, onFormSubmit, onInputChange, form, errors, setForm}) => {
    const childrenWithProps = React.Children.map(children, (child) => {
        if (child.props && child.props.forminput) {
            return React.cloneElement(child, {
                onChange: onInputChange,
                form, errors, setForm
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

const formGroupEnhance = compose(
    setDisplayName('FormGroup'),
    withHandlers({
        onSelectChange: props => (item) => {
            let value = '';
            if (item) {
                value = item.value;
            }
            props.setForm((f) => {
                return update(f, {[props.id]: {$set: value}});
            });
        },
    }),
);
export const FormGroup = formGroupEnhance((props) => {
    const {
        id, label, type, onChange, form, errors,
        className, placeholder, check, row, inline, disabled,
        tag, selectOptions, options, onSelectChange,
        style, innerRef, lat, lng, setForm
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
    let latitude, longitude;
    if (lat) {
        latitude = form[lat];
    }
    if (lng) {
        longitude = form[lng];
    }
    const error = errors[name];
    const feedbackClass = error ? 'show-feedback' : '';

    const checkOrRadio = ['checkbox', 'radio'].includes(type);
    const isDatePicker = type === 'date';

    //handle checkbox and radio initial values
    let checked;
    if (type === 'radio') {
        checked = value === form[name];
    } else if (type === 'checkbox') {
        checked = value;
    }

	const valid = error ? false : undefined;

    const isSelect = type === 'select';
    const isMap = type === 'map';

    return (
        <RFormGroup
            row={row}
            check={check}
            inline={inline}
            disabled={disabled}
            tag={tag}
            className={className}
            style={style}
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
            { !checkOrRadio && !isDatePicker && !isSelect && !isMap &&
                <Input
                    type={type} name={name} id={id} value={value}
                    onChange={onChange} valid={valid} placeholder={placeholder}
                    ref={innerRef}
                > </Input>
            }
            { isDatePicker &&
                <DatePicker
                    className={error ? 'is-invalid' : ''} onChange={onChange}
                    value={value} type={type} name={name} id={id} placeholder={placeholder}
                />
            }
            { isSelect &&
                <Select
                    id={id} name={name} value={value}
                    options={options} onChange={onSelectChange}
                    placeholder={placeholder} {...selectOptions}
                />
            }
            { isMap &&
                    <MapWithASearchBox
                        initial={value}
                        latitude={latitude} longitude={longitude}
                        onMapChanged={(places)=>{
                            const place = R.head(places);
                            if (place) {
                                setForm((f) => {
                                    return update(f, {
                                        [props.id]: {$set: place.formatted_address},
                                        [lat]: {$set: place.geometry.location.lat().toFixed(6)},
                                        [lng]: {$set: place.geometry.location.lng().toFixed(6)},
                                    });

                                });
                            }
                        }}
                    />
            }
            <FormFeedback className={feedbackClass}>{error || ''}</FormFeedback>
        </RFormGroup>
    );
});


export class Input extends React.Component {
    componentDidMount() {
        this.el.indeterminate = this.props.indeterminate;
    }

    componentDidUpdate(prevProps) {
        if (prevProps.indeterminate !== this.props.indeterminate) {
            this.el.indeterminate = this.props.indeterminate;
        }
    }
    render() {
        let props = Object.assign({}, this.props);
        delete props.indeterminate;
        delete props.children;

        return (
            <RInput
                {...props}
                innerRef={el => {this.el = el;}}
            />
        );
    }
}

export const FormGroupWrap = (props) => {
    const {errors, form, onChange, className, setForm} = props;
    const childrenWithProps = React.Children.map(props.children, (child) => {
        if (child.props && child.props.forminput) {
            return React.cloneElement(child, { errors, form, onChange, setForm });
        } else {
            return child;
        }
    });

    let elProps = Object.assign({}, props);
    delete elProps.setForm;
    delete elProps.onChange;
    delete elProps.form;
    delete elProps.errors;
    delete elProps.forminput;

    const classNames = `le-form-group-wrap ${className}`;

    return (
        <RFormGroup className={classNames} {...elProps} >
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

const enhanceSearch = compose(
	withState('typedSearch', 'setTypedSearch', (props) => props.search)
);
export const SearchInput = enhanceSearch(({
	setSearch, search, typedSearch, setTypedSearch, className,
}) => {
    return (
        <InputGroup
            className={"le-search-input " + className}>
            <Input
                onChange={R.compose(setTypedSearch, R.prop('value'), R.prop('target'))}
                onKeyPress={R.compose(setSearch, onKeyPress('Enter', search))}
                placeholder="search..."
				value={typedSearch}
            />
            <InputGroupButton>
                    {search ? (
						<Button
							color="danger" outline
							onClick={() => {
								setSearch('');
								setTypedSearch('');
							}}
						>
							<FontAwesome name="times"/>
						</Button>
					) : (
						<Button
							color="info" outline
							onClick={() => {setSearch(typedSearch);}}
						>
							<FontAwesome name="search"/>
						</Button>
					)}
            </InputGroupButton>
        </InputGroup>
    );
});

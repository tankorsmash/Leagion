import {Form, FormGroup, FormGroupWrap} from 'components/forms';
import {Button} from 'reactstrap';
import {BaseComponent} from './base';

export class FormComp extends BaseComponent {
    static component = Form;
    //static defaultAttrs = {
        //buttonText: 'Open Modal',
        //title: 'Modal Title',
    //};

    title = 'Forms';
    description = (
        <p>
            Use these forms as a guideline.<br/>
            Always use FormGroup and FormGroupWrap
            inside a form or else the form and error data won't get passed through
        </p>
    );

    renderCode() {
        return (
` import {Form, FormGroup, FormGroupWrap} from 'components/forms';
import {Button} from 'reactstrap';
<Form
    onSubmit={(form, setErrors, setSuccess) => {console.log(form);}}
    form={{
        'email': '',
        'text': '',
        'number': '',
        'cb1': false,
        'cb2': true,
        'rgroup': 'radio1',
        'range': '',
        'grouptext1': '',
        'grouptext2': '',
    }}
>
    <FormGroup label="Email" type="email" id="email" />
    <FormGroup label="Text" type="text" id="text" />
    <FormGroup label="Number" type="number" id="number" />
    <FormGroup label="Stacked Checkbox 1" type="checkbox" id="cb1" />
    <FormGroup label="Stacked Checkbox 2" type="checkbox" id="cb2" />
    <FormGroup inline label="Inline Radio 1" type="radio" name="rgroup" value="radio1" />
    <FormGroup inline label="Radios need to be in a fieldset" type="radio" name="rgroup" value="radio2" />
    <FormGroup label="Range" type="range" id="range" />
    <FormGroupWrap row>
        <FormGroup className="col-md-6" label="Row" type="text" id="grouptext1" />
        <FormGroup className="col-md-6" label="Row 2" type="text" id="grouptext2" />
    </FormGroupWrap>
    <FormGroupWrap className="text-center">
        <Button type='submit' value='Submit'>Save</Button>
    </FormGroupWrap>
</Form>`
        );
    }

    renderComponent() {
        return (
            <Form
                onSubmit={(form, setErrors, setSuccess) => {console.log(form);}}
                form={{
                    'email': '',
                    'text': '',
                    'number': '',
                    'cb1': false,
                    'cb2': true,
                    'rgroup': 'radio1',
                    'range': '',
                    'grouptext1': '',
                    'grouptext2': '',
                }}
            >
                <FormGroup label="Email" type="email" id="email" />
                <FormGroup label="Text" type="text" id="text" />
                <FormGroup label="Number" type="number" id="number" />
                <FormGroup label="Stacked Checkbox 1" type="checkbox" id="cb1" />
                <FormGroup label="Stacked Checkbox 2" type="checkbox" id="cb2" />
                <FormGroup inline label="Inline Radio 1" type="radio" name="rgroup" value="radio1" />
                <FormGroup inline label="Radios need to be in a fieldset" type="radio" name="rgroup" value="radio2" />
                <FormGroup label="Range" type="range" id="range" />
                <FormGroupWrap row>
                    <FormGroup className="col-md-6" label="Row" type="text" id="grouptext1" />
                    <FormGroup className="col-md-6" label="Row 2" type="text" id="grouptext2" />
                </FormGroupWrap>
                <FormGroupWrap className="text-center">
                    <Button type='submit' value='Submit'>Save</Button>
                </FormGroupWrap>
            </Form>
        );
    }
}


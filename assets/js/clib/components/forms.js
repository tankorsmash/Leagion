import {Form, FormGroup, FormGroupWrap} from 'components/forms';
import {FormModal} from 'components/modals';
import {Button} from 'reactstrap';
import {BaseComponent} from './base';

export class FormComp extends BaseComponent {
    static component = Form;
    title = 'Quick Forms';
    description = (
        <p>
            Use this form and formgroups as an easy way to do simple forms.<br/>
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
        'select': '',
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
    <FormGroup label="Select" type="select" id="select">
        <option>-- default option --</option>
        <option value="1">option 1</option>
        <option value="2">option 2</option>
    </FormGroup>
    <FormGroup label="Stacked Checkbox 1" type="checkbox" id="cb1" />
    <FormGroup label="Stacked Checkbox 2" type="checkbox" id="cb2" />
    <FormGroup inline label="Inline Radio 1" type="radio" name="rgroup" value="radio1" />
    <FormGroup inline label="Inline Radio 2" type="radio" name="rgroup" value="radio2" />
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
                    'select': '',
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
                <FormGroup label="Select" type="select" id="select">
                    <option>-- default option --</option>
                    <option value="1">option 1</option>
                    <option value="2">option 2</option>
                </FormGroup>
                <FormGroup label="Stacked Checkbox 1" type="checkbox" id="cb1" />
                <FormGroup label="Stacked Checkbox 2" type="checkbox" id="cb2" />
                <FormGroup inline label="Inline Radio 1" type="radio" name="rgroup" value="radio1" />
                <FormGroup inline label="Inline Radio 2" type="radio" name="rgroup" value="radio2" />
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

export class FormModalComp extends BaseComponent {
    static component = FormModal;
    static defaultAttrs = {
        buttonText: 'Open Form Modal',
        title: 'Form Modal Title',
    };
    title = 'Form Modal';

    renderCode() {
        return (
` import {Form, FormGroup, FormGroupWrap} from 'components/forms';
import {FormModal} from 'components/modals';
<FormModal
    {...this.state}
    body={
        <Form
            onSubmit={(form, setErrors, setSuccess) => {console.log(form);setSuccess();}}
            form={{
                'text': '',
            }}
        >
            <FormGroup label="Text" type="text" id="text" />
        </Form>
    }
    onClose={() => {
        console.log('modal has closed')}
    }
/>`
        );
    }

    renderComponent() {
        return (
            <FormModal
                {...this.state}
                body={
                    <Form
                        onSubmit={(form, setErrors, setSuccess) => {console.log(form);setSuccess();}}
                        form={{
                            'text': '',
                        }}
                    >
                        <FormGroup label="Text" type="text" id="text" />
                    </Form>
                }
                onClose={() => {
                    console.log('modal has closed')}
                }
            />
        );
    }
}


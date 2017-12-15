import {Form, FormGroup, FormGroupWrap} from 'components/forms';
import {FormModal} from 'components/modals';
import {Button} from 'reactstrap';
import {BaseComponent} from './base';

export class FormComp extends BaseComponent {
    static component = Form;
    title = 'Quick Forms';
    description = `
            Use this form and formgroups as an easy way to do simple forms.
            Always use FormGroup and FormGroupWrap
            inside a form or else the form and error data won't get passed through
    `;

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
        'date': '',
        'grouptext1': '',
        'grouptext2': '',
    }}
>
    <FormGroup forminput label="Email" type="email" id="email" />
    <FormGroup forminput label="Text" type="text" id="text" />
    <FormGroup forminput label="Number" type="number" id="number" />
    <FormGroup forminput
        options={[
            {value: 1, label: 'option 1'},
            {value: 2, label: 'option 2'},
        ]}
        label="Select" type="select" id="select"
    />
    <FormGroup forminput label="Stacked Checkbox 1" type="checkbox" id="cb1" />
    <FormGroup forminput label="Stacked Checkbox 2" type="checkbox" id="cb2" />
    <FormGroup forminput inline label="Inline Radio 1" type="radio" name="rgroup" value="radio1" />
    <FormGroup forminput inline label="Inline Radio 2" type="radio" name="rgroup" value="radio2" />
    <FormGroup forminput label="Range" type="range" id="range" />
    <FormGroup forminput label="Date" type="date" id="date" />
    <FormGroupWrap forminput row>
        <FormGroup forminput className="col-md-6" label="Row" type="text" id="grouptext1" />
        <FormGroup forminput className="col-md-6" label="Row 2" type="text" id="grouptext2" />
    </FormGroupWrap>
    <FormGroupWrap forminput className="text-center">
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
                    'date': '',
                    'grouptext1': '',
                    'grouptext2': '',
                }}
            >
                <FormGroup forminput label="Email" type="email" id="email" />
                <FormGroup forminput label="Text" type="text" id="text" />
                <FormGroup forminput label="Number" type="number" id="number" />
                <FormGroup forminput
                    options={[
                        {value: 1, label: 'option 1'},
                        {value: 2, label: 'option 2'},
                    ]}
                    label="Select" type="select" id="select"
                />
                <FormGroup forminput label="Stacked Checkbox 1" type="checkbox" id="cb1" />
                <FormGroup forminput label="Stacked Checkbox 2" type="checkbox" id="cb2" />
                <FormGroup forminput inline label="Inline Radio 1" type="radio" name="rgroup" value="radio1" />
                <FormGroup forminput inline label="Inline Radio 2" type="radio" name="rgroup" value="radio2" />
                <FormGroup forminput label="Range" type="range" id="range" />
                <FormGroup forminput label="Date" type="date" id="date" />
                <FormGroupWrap forminput row>
                    <FormGroup forminput className="col-md-6" label="Row" type="text" id="grouptext1" />
                    <FormGroup forminput className="col-md-6" label="Row 2" type="text" id="grouptext2" />
                </FormGroupWrap>
                <FormGroupWrap forminput className="text-center">
                    <Button type='submit' value='Submit'>Save</Button>
                </FormGroupWrap>
            </Form>
        );
    }
}

export class FormModalComp extends BaseComponent {
    static component = FormModal;
    static defaultAttrs = {
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
            <FormGroup forminput label="Text" type="text" id="text" />
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
                Opener={<Button>Open Form Modal</Button>}
                body={
                    <Form
                        onSubmit={(form, setErrors, setSuccess) => {console.log(form);setSuccess();}}
                        form={{
                            'text': '',
                        }}
                    >
                        <FormGroup forminput label="Text" type="text" id="text" />
                    </Form>
                }
                onClose={() => {
                    console.log('modal has closed')}
                }
            />
        );
    }
}


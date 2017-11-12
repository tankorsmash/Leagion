import {compose, setDisplayName } from 'recompose';
import FontAwesome from 'react-fontawesome';
import {Button} from 'components/buttons';
import {FormModal} from 'components/modals';
import {Form} from 'components/forms';

const enhance = compose(
    setDisplayName('SeasonCreateModal'),
);
export default enhance((props) => {
    return (
        <FormModal
            Opener={
                <Button color="primary" size="md" >
                    <FontAwesome name="plus"/> {' New Season'}
                </Button>
            }
            body={
                <Form
                    onSubmit={(form, setErrors, setSuccess) => {
                        console.log(form);setSuccess();}
                    }
                    form={{
                        'text': '',
                    }}
                >
                    <FormGroupWrap row>
                        <FormGroup className="col-md-6" label="Start date" type="text" id="grouptext1" />
                        <FormGroup className="col-md-6" label="End date" type="text" id="grouptext2" />
                    </FormGroupWrap>
                </Form>
            }
            onClose={() => {
                console.log('modal has closed')}
            }
        />
    );
});

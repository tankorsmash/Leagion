import {compose, setDisplayName } from 'recompose';
import FontAwesome from 'react-fontawesome';

import {Button} from 'components/buttons';
import {FormModal} from 'components/modals';
import {Form, FormGroup, FormGroupWrap} from 'components/forms';
import ajax from 'common/ajax';

const enhance = compose(
    setDisplayName('LeagueCreateModal'),
);
export default enhance(({user}) => {
    return (
        <FormModal
            title="Create a new league"
            Opener={
                <Button color="primary" size="md" >
                    <FontAwesome name="plus"/> {' Create New League'}
                </Button>
            }
            body={
                <Form
                    onSubmit={(form, setErrors, setSuccess) => {
                        ajax({
                            url: reverse('api-league-list'),
                            method: 'POST',
                            data: form,
                        }).then(data => {
                            toastr.success("League Created!");
                            setSuccess();
                            //this.props.updateScore(data);
                        }).catch(data => {
                            setErrors(data);
                        });
                    }}
                    form={{
                        'name': '',
                        'commissioner': user.id,
                    }}
                >
                    <FormGroup label="Name" type="text" id="name" />
                </Form>
            }
        />
    );
});

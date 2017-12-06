import {compose, setDisplayName } from 'recompose';
import FontAwesome from 'react-fontawesome';

import {Button} from 'components/buttons';
import {FormModal} from 'components/modals';
import {Form, FormGroup, FormGroupWrap} from 'components/forms';
import ajax from 'common/ajax';

const enhance = compose(
    setDisplayName('TeamCreateModal'),
);
export default enhance(({season, onSuccess}) => {
    return (
        <FormModal
            title="Create a new team"
            Opener={
                <Button color="primary" size="md" >
                    <FontAwesome name="plus"/> {' Create New Team'}
                </Button>
            }
            body={
                <Form
                    onSubmit={(form, setErrors, setSuccess) => {
                        ajax({
                            url: reverse('api-my-comm-team-list'),
                            method: 'POST',
                            data: form,
                        }).then(data => {
                            toastr.success("Team Created!");
                            setSuccess();
                            onSuccess();
                        }).catch(data => {
                            setErrors(data);
                        });
                    }}
                    form={{
                        'name': '',
                        'season_id': season.id,
                    }}
                >
                    <FormGroup label="Name" type="text" id="name" />
                </Form>
            }
        />
    );
});

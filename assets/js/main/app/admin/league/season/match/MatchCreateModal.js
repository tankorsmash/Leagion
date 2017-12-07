import {compose, setDisplayName } from 'recompose';
import FontAwesome from 'react-fontawesome';

import {Button} from 'components/buttons';
import {FormModal} from 'components/modals';
import {Form, FormGroup, FormGroupWrap} from 'components/forms';
import ajax from 'common/ajax';

const enhance = compose(
    setDisplayName('MatchCreateModal'),
);
export default enhance(({season, onSuccess}) => {
    return (
        <FormModal
            title="Add a match"
            Opener={
                <Button color="primary" size="md" >
                    <FontAwesome name="plus"/> {' Add Match'}
                </Button>
            }
            body={
                <Form
                    onSubmit={(form, setErrors, setSuccess) => {
                        ajax({
                            url: reverse('api-my-comm-match-list'),
                            method: 'POST',
                            data: form,
                        }).then(data => {
                            toastr.success("Match Added!");
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

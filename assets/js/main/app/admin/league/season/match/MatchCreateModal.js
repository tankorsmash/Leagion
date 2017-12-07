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
                        'date': '',
                        'time': '',
                        'home_team_id': '',
                        'away_team_id': '',
                        'season': season.id,
                    }}
                >
                    <FormGroup label="Date" type="date" id="date" />
                    <FormGroup label="Time" type="time" id="time" />
                    <FormGroup label="Home Team" type="text" id="home_team_id" />
                    <FormGroup label="Away Team" type="text" id="Away_team_id" />
                </Form>
            }
        />
    );
});

import {compose, setDisplayName } from 'recompose';
import FontAwesome from 'react-fontawesome';

import {Button} from 'components/buttons';
import {FormModal} from 'components/modals';
import {Form, FormGroup, FormGroupWrap} from 'components/forms';
import ajax from 'common/ajax';

const enhance = compose(
    setDisplayName('PlayerCreateModal'),
);
export default enhance(({season, onSuccess}) => {
    const teamOptions = season.teams.map((team) => ({
        value: team.id,
        label: team.name,
    }));
    return (
        <FormModal
            title="Add a player"
            Opener={
                <Button color="primary" size="md" >
                    <FontAwesome name="plus"/> {' Add Player'}
                </Button>
            }
            body={
                <Form
                    onSubmit={(form, setErrors, setSuccess) => {
                        ajax({
                            url: reverse('api-my-comm-player-list'),
                            method: 'POST',
                            data: form,
                        }).then(data => {
                            toastr.success("Player Added!");
                            setSuccess();
                            onSuccess();
                        }).catch(data => {
                            setErrors(data);
                        });
                    }}
                    form={{
                        'first_name': '',
                        'last_name': '',
                        'email': '',
                        'default_phonenumber': '',
                        'team_id': null,
                        'is_captain': false,
                        'season_id': season.id,
                    }}
                >
                    <FormGroup label="First Name" type="text" id="first_name" />
                    <FormGroup label="Last Name" type="text" id="last_name" />
                    <FormGroup label="Email" type="email" id="email" />
                    <FormGroup label="Mobile number" type="text" id="default_phonenumber" />
                    <FormGroup label="Team" type="select" id="team_id" options={teamOptions} />
                    <FormGroup label="Is Team Captain" type="checkbox" id="is_captain" />
                </Form>
            }
        />
    );
});

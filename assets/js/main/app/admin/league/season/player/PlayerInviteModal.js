import {compose, setDisplayName } from 'recompose';

import {FormModal} from 'components/modals';
import {Form, FormGroup, FormGroupWrap} from 'components/forms';
import ajax from 'common/ajax';

const enhance = compose(
    setDisplayName('PlayerInviteModal'),
);
export default enhance(({season, onSuccess, className, Opener}) => {
    const teamOptions = season.teams.map((team) => ({
        value: team.id,
        label: team.name,
    }));
    return (
        <FormModal
            title="Invite new player"
            Opener={Opener}
            body={
                <Form
                    onSubmit={(form, setErrors, setSuccess) => {
                        ajax({
                            url: reverse('api-invite-user'),
                            method: 'POST',
                            data: form,
                        }).then(data => {
                            toastr.success("Player Invited!");
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
                        'team_id': '',
                        'is_captain': false,
                        'season_id': season.id,
                    }}
                >
                    <FormGroup forminput label="Email" type="email" id="email" />
                    <FormGroupWrap forminput row>
                        <FormGroup forminput className="col-md-6" label="First Name" type="text" id="first_name" />
                        <FormGroup forminput className="col-md-6" label="Last Name" type="text" id="last_name" />
                    </FormGroupWrap>
                    <FormGroup forminput label="Team" type="select" id="team_id" options={teamOptions} />
                    <FormGroup forminput label="Is Team Captain" type="checkbox" id="is_captain" />
                    <FormGroup forminput label="Mobile number (optional)" type="text" id="default_phonenumber" />
                </Form>
            }
        />
    );
});

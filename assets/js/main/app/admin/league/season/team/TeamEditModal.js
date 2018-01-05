import {compose, setDisplayName } from 'recompose';
import FontAwesome from 'react-fontawesome';

import {Button} from 'components/buttons';
import {Dropdown, DropdownItem} from 'components/dropdowns';
import {FormModal} from 'components/modals';
import {Form, FormGroup, FormGroupWrap} from 'components/forms';
import ajax from 'common/ajax';

const enhance = compose(
    setDisplayName('TeamEditModal'),
);
export default enhance(({team, onSuccess, Opener}) => {
    return (
        <FormModal
            title={"Edit Team"}
            Opener={Opener}
            body={
                <Form
                    onSubmit={(form, setErrors, setSuccess) => {
                        ajax({
                            url: reverse('api-my-comm-team-detail', {team_id: team.id}),
                            method: 'PATCH',
                            data: form,
                        }).then(data => {
                            toastr.success("Team Changed!");
                            setSuccess();
                            onSuccess();
                        }).catch(data => {
                            setErrors(data);
                        });
                    }}
                    form={{
                        'name': team.name,
                    }}
                >
                    <FormGroup forminput label="Name" type="text" id="name" />
                </Form>
            }
        />
    );
});

import {compose, setDisplayName } from 'recompose';

import {FormModal} from 'components/modals';
import {Form, FormGroup, FormGroupWrap} from 'components/forms';
import ajax from 'common/ajax';

const enhance = compose(
    setDisplayName('MatchEditModal'),
);
export default enhance(({season, onSuccess, match, Opener}) => {
    const teamOptions = season.teams.map((team) => ({
        value: team.id,
        label: team.name,
    }));
    return (
        <FormModal
            title="Set The Match Score"
            Opener={Opener}
            body={
                <Form
                    onSubmit={(form, setErrors, setSuccess) => {
                        ajax({
                            url: reverse('api-my-comm-match-detail', {match_id: match.id}),
                            method: 'PATCH',
                            data: form,
                        }).then(data => {
                            toastr.success("Score Set!");
                            setSuccess();
                            onSuccess();
                        }).catch(data => {
                            setErrors(data);
                        });
                    }}
                    form={{
                        'home_points': match.home_points,
                        'away_points': match.away_points,
                    }}
                >
                    <FormGroupWrap forminput row>
                        <FormGroup forminput className="col-md-6" label={match.home_team.name} type="number" id="home_points"/>
                        <FormGroup forminput className="col-md-6" label={match.away_team.name} type="number" id="away_points"/>
                    </FormGroupWrap>
                </Form>
            }
        />
    );
});

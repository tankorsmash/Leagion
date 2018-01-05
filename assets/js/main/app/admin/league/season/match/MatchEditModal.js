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
    const locationOptions = season.league.locations.map((location) => ({
        value: location.id,
        label: location.name,
    }));
    return (
        <FormModal
            title="Edit Match"
            Opener={Opener}
            body={
                <Form
                    onSubmit={(form, setErrors, setSuccess) => {
                        ajax({
                            url: reverse('api-my-comm-match-detail', {match_id: match.id}),
                            method: 'PATCH',
                            data: form,
                        }).then(data => {
                            toastr.success("Match Edited!");
                            setSuccess();
                            onSuccess();
                        }).catch(data => {
                            setErrors(data);
                        });
                    }}
                    form={{
                        'date': match.date,
                        'time': match.time,
                        'home_team_id': match.home_team.id,
                        'away_team_id': match.away_team.id,
                        'location_id': match.location_id,
                        'season': season.id,
                    }}
                >
                    <FormGroupWrap forminput row>
                        <FormGroup forminput className="col-md-6" label="Date" type="date" id="date" />
                        <FormGroup forminput className="col-md-6" label="Time" type="time" id="time" />
                    </FormGroupWrap>
                    <FormGroup forminput label="Home Team" type="select" id="home_team_id" options={teamOptions} />
                    <FormGroup forminput label="Away Team" type="select" id="away_team_id" options={teamOptions} />
                    <FormGroup forminput label="Location" type="select" id="location_id" options={locationOptions} />
                </Form>
            }
        />
    );
});

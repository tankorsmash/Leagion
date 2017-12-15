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
                        'location_id': '',
                        'season': season.id,
                    }}
                >
                    <FormGroupWrap row>
                        <FormGroup className="col-md-6" label="Date" type="date" id="date" />
                        <FormGroup className="col-md-6" label="Time" type="time" id="time" />
                    </FormGroupWrap>
                    <FormGroup label="Home Team" type="select" id="home_team_id" options={teamOptions} />
                    <FormGroup label="Away Team" type="select" id="away_team_id" options={teamOptions} />
                    <FormGroup label="Location" type="select" id="location_id" options={locationOptions} />
                </Form>
            }
        />
    );
});

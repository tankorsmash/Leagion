import {Form, FormGroup, FormGroupWrap} from 'components/forms';
import {FormModal} from 'components/modals';
import ajax from 'common/ajax';
import {Button} from 'components/buttons';

export default class MatchScoreSetter extends React.Component {
    onSubmit = (form, setErrors, setSuccess) => {
        ajax({
            url: reverse('api-set-match-score', {match_id: this.props.matchId}),
            method: 'PATCH',
            data: form,
        }).then(data => {
            toastr.success("Score Set!");
            setSuccess();
            this.props.updateScore(data);
        }).catch(data => {
            setErrors(data);
        });

    };

    render() {
        return (
            <FormModal
                Opener={<Button color="link">Completed this match?</Button>}
                buttonText="Completed this match?"
                buttonProps={{color: 'link'}}
                title="Set the score for the match"
                submitText="Submit"
                body={
                    <Form
                        onSubmit={this.onSubmit}
                        form={{
                            'home_points': '',
                            'away_points': '',
                        }}
                    >
                        <FormGroupWrap forminput row>
                            <FormGroup forminput
                                className="col-md-6"
                                label={this.props.home_team.name}
                                type="number"
                                id="home_points"
                            />
                            <FormGroup forminput
                                className="col-md-6"
                                label={this.props.away_team.name}
                                type="number"
                                id="away_points"
                            />
                        </FormGroupWrap>
                    </Form>
                }
            >
            </FormModal>
        );
    }
}

import {Button} from 'reactstrap';

import {FormBase, FormGroup} from 'components/forms';
import {Modal} from 'components/modals';

import ajax from 'common/ajax';

export default class MatchScoreSetter extends FormBase {
    url = 'api-set-match-score';

    get form() {
        return {
            'home_score': '',
            'away_score': '',
        };
    }

    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            form: this.form,
            errors: {},
        };
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });

        return false;
    };

    handleSubmit = (event) => {
        event.preventDefault();

        ajax({
            url: reverse(this.url, {match_id: this.props.matchId}),
            method: 'PUT',
            data: {
                home_points: this.state.form.home_score,
                away_points: this.state.form.away_score,
            }
        }).then(data => {
            this.props.updateScore(data);
            this.setState({
                isOpen: false,
                form: this.form,
            });
            toastr.success("Score Set!");
        }).catch(data => {
            this.setState({
                errors: data,
            });
        });

    };

    render() {
        return (
            <div>
                <a href="#" onClick={this.toggle}>Completed this match?</a>

                <Modal
                    toggle={this.toggle}
                    isOpen={this.state.isOpen}
                    title="Set the score for the match."
                    footer={
                        <div>
                            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                            {' '}
                            <Button color="primary" onClick={this.handleSubmit}>Submit</Button>
                        </div>
                    }
                    body={
                        <div>
                            <FormGroup
                                label={this.props.home_team.name}
                                type="number"
                                id="home_score"
                                value={this.state.form.home_score}
                                onChange={this.handleInputChange}
                                error={this.state.errors.home_score}
                            />
                            <FormGroup
                                label={this.props.away_team.name}
                                type="number"
                                id="away_score"
                                value={this.state.form.away_score}
                                onChange={this.handleInputChange}
                                error={this.state.errors.away_score}
                            />
                        </div>
                    }
                />
            </div>
        );
    }
}

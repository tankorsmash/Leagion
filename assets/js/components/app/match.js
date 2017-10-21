import {Link} from 'components/buttons';
import urls from 'main/app/player/urls';
import {ListGroup, ListGroupItem} from 'reactstrap';
import { Table } from 'components/tables';
import { Button, Input, Card, CardBlock, CardTitle, CardSubtitle, CardText } from 'reactstrap';
import ajax from 'common/ajax';
import {Modal} from 'components/modals';
import {FormBase, FormGroup} from 'components/forms';

export const MatchTable = (props) => {
    const {matches, seasonId, leagueId} = props;
    return (
        <Table responsive striped
            data={props.matches}
            columns={[
                {header: 'Date', cell: (match) => (
                    <Link
                        url={urls.matchDetail}
                        args={{
                            leagueId: leagueId,
                            seasonId: seasonId,
                            matchId: match.id
                        }}
                    >
                        {match.pretty_date}
                    </Link>)
                },
                {header: 'Time', cell: 'pretty_time'},
                {header: 'Home Team', cell: (match) => (
                    <Link
                        url={urls.teamDetail}
                        args={{
                            leagueId: leagueId,
                            seasonId: seasonId,
                            teamId: match.home_team.id,
                        }}
                    >
                        {match.home_team.name}
                    </Link>)
                },
                {header: '', cell: () => 'vs.'},
                {header: 'Away Team', cell: (match) => (
                    <Link
                        url={urls.teamDetail}
                        args={{
                            leagueId: leagueId,
                            seasonId: seasonId,
                            teamId: match.away_team.id,
                        }}
                    >
                        {match.away_team.name}
                    </Link>)
                },
                {header: 'Location', cell: (match) => match.location.name},
                {header: 'Results', cell: (match) => {
                    if (match.completed) {
                        return <span>{match.home_points} - {match.away_points}</span>;
                    } else {
                        return <span>N/A </span>;
                    }
                }},
            ]}
        />
    );
};

export const MatchList = (props) => {
    return (
        <ListGroup>
            {props.matches.map((match, i) => {
                return (
                    <ListGroupItem key={i}>
                        {/*
                            TODO Link
                            <Link to={`${matchUrls.index}/${match.id}`}>
                                {match.pretty_name}
                            </Link>
                        */}
                    </ListGroupItem>
                );
            })}
        </ListGroup>
    );
};

export class MatchScoreSetter extends FormBase {
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

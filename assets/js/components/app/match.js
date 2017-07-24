import {Link} from 'react-router-dom';
import { ListGroup, ListGroupItem, Table } from 'reactstrap';
import { Button, Input, Card, CardBlock, CardTitle, CardSubtitle, CardText } from 'reactstrap';
import matchUrls from 'main/app/player/match/urls';
import {TeamLink} from 'components/app/team';
import SpinLoader from 'components/spinloader';
import ajax from 'common/ajax';
import Dragula from 'react-dragula';
import {Modal} from 'components/modals';
import {FormBase, FormGroup} from 'components/forms';

export const MatchLink = (props) => {
	return (
		<Link to={`${matchUrls.index}/${props.id}`}>
			{props.text}
		</Link>
	);
};

export const MatchTable = (props) => {
	return (
		<Table responsive className="leagion-table">
			<thead>
				<tr>
					<th>Date</th>
					<th>Time</th>
					<th>Home Team</th>
					<th></th>
					<th>Away Team</th>
					<th>Location</th>
					<th>Results</th>
				</tr>
			</thead>
			<tbody>
				{props.matches.map((match, i) => {
					return (
						<tr key={i}>
							<td><MatchLink id={match.id} text={match.pretty_date}/></td>
							<td>{match.pretty_time}</td>
							<td><TeamLink id={match.home_team.id} text={match.home_team.name}/></td>
							<td>vs.</td>
							<td><TeamLink id={match.away_team.id} text={match.away_team.name}/></td>
							<td>{match.location.name}</td>
							<td>
								{ match.completed ?
									<span>{match.home_points} - {match.away_points}</span> :
									<span>N/A </span>
								}
							</td>
						</tr>
					);
				})}
			</tbody>
		</Table>
	);
};

export const MatchList = (props) => {
	return (
		<ListGroup>
			{props.matches.map((match, i) => {
				return (
					<ListGroupItem key={i}>
						<Link to={`${matchUrls.index}/${match.id}`}>
							{match.pretty_name}
						</Link>
					</ListGroupItem>
				);
			})}
		</ListGroup>
	);
};

export class MatchScoreSetter extends FormBase {
    url = 'set-score';

    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            form: {
                'home_score': '',
                'away_score': '',
            },
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
		console.log('handled');
        event.preventDefault();

        ajax({
            url: reverse(this.url),
			method: 'POST',
            data: this.state.form,
        }).then(data => {
			console.log(data);
        }).catch(data => {
			console.log(data);
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

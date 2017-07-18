import {Link} from 'react-router-dom';
import { ListGroup, ListGroupItem, Table } from 'reactstrap';
import { Card, CardBlock, CardTitle, CardSubtitle, CardText } from 'reactstrap';
import matchUrls from 'main/app/player/match/urls';
import {TeamLink} from 'components/app/team';
import SpinLoader from 'components/spinloader';
import ajax from 'common/ajax';
import Dragula from 'react-dragula';

export const MatchLink = (props) => {
	return (
		<Link to={`${matchUrls.index}/${props.id}`}>
			{props.text}
		</Link>
	);
};

export const MatchTable = (props) => {
	return (
		<Table responsive>
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
							<td>{match.home_points} - {match.away_points}</td>
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

export const MatchCard = (props) => {
	let match = props.match;

	return (
		<div>
			<Card>
				<CardBlock>
					<CardTitle className="text-center">
						<Table> 
							<thead>
								<tr>
									<th className="text-center"><TeamLink id={match.home_team.id} text={match.home_team.name}/></th>
									<th className="text-center">vs.</th>
									<th className="text-center"><TeamLink id={match.away_team.id} text={match.away_team.name}/></th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>{match.home_points}</td>
									<td></td>
									<td>{match.away_points}</td>
								</tr>
							</tbody>
						</Table>
						{match.pretty_date}
						<br/>
						{match.pretty_time}
					</CardTitle>
					<CardSubtitle></CardSubtitle>
					<CardText>
					</CardText>
				</CardBlock>
			</Card>
		</div>
	);
};

export class FullRosterTable extends React.Component {
	constructor(props) {
		super(props);

		this.state = { 
			team: {},
			players: [],
			notPlaying: [],
			loaded: false
		};
	}

	componentDidMount() {
		ajax({
			url: reverse('api-roster-detail', {roster_id: this.props.rosterId}),
		}).then(data => {
			this.setStateFromRosterData(data);
		});
	}

	setUpDragging = (el) => {
		this.drake = Dragula([this.playingEl, this.notPlayingEl]).on('drop', this.setNewRoster);
	};

	setStateFromRosterData(data) {
		this.setState({
			team: data.team,
			players: data.batters,
			notPlaying: data.not_playing_players,
			loaded: true,
		});
	}

	setNewRoster = (el, source, target, siblings) => {

		const data = [...this.playingEl.childNodes].map((playerNode, i) => {
			return {
				player_id: playerNode.dataset.playerId,
				roster: this.props.rosterId,
				index: i,
			};
		});

		this.drake.cancel(true);

		ajax({
			data: {batters: data},
			method: 'PUT',
			url: reverse('api-roster-detail', {roster_id: this.props.rosterId}),
		}).then(data => {
			this.setStateFromRosterData(data);
		});

	};

	userIsTeamCaptain() {
		return this.props.user.captain_of_teams.includes(this.state.team.id);
	}

	render() {
		const isTeamCaptain = this.userIsTeamCaptain();

		return (
			<SpinLoader loaded={this.state.loaded}>
				<div
					ref={this.setUpDragging}
					className="fullroster-table"
				>
					<div className="roster-table">
						<h4>Playing</h4>
						<Table>
							<thead>
								<tr>
									<th>#</th>
									<th>Name</th>
								</tr>
							</thead>
							<tbody
								ref={(el) => {this.playingEl = el;}}
								className="fullroster-table-container">
								{this.state.players.map((batter, i) => {
									return (
										<tr
											key={i}
											className={isTeamCaptain ? "roster-draggable" : ""}
											data-player-id={batter.player.id}
										>
											<th className="index" scope="row">{batter.index + 1}</th>
											<td>{batter.player.full_name}</td>
										</tr>
									);
								})}
							</tbody>
						</Table>
					</div>
					<div className="not-playing-table">
						<h4>Not playing</h4>
						<Table>
							<thead>
								<tr>
									<th>#</th>
									<th>Name</th>
								</tr>
							</thead>
							<tbody
								ref={(el) => {this.notPlayingEl = el;}}
								className="fullroster-table-container"
							>
								{this.state.notPlaying.map((player, i) => {
									return (
										<tr key={i} className={isTeamCaptain ? "roster-draggable" : ""}>
											<th className="index" scope="row">{i + 1}</th>
											<td>{player.full_name}</td>
										</tr>
									);
								})}
							</tbody>
						</Table>
					</div>
				</div>
			</SpinLoader>
		);
	}
}

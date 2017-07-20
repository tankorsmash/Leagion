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

class DroppableRosterTable extends React.Component {

	render() {

		let {players, isTeamCaptain, id, setRef} = this.props;

		if (players.length) {
			return (
				<Table>
					<thead>
						<tr>
							<th>#</th>
							<th>Name</th>
							<th></th>
						</tr>
					</thead>
					<tbody
						ref={(el) => {setRef(el, id);}}
						className="fullroster-table-container">
						{players.map((player, i) => {
							return (
								<tr
									key={i}
									className={isTeamCaptain ? "roster-draggable" : ""}
									data-player-id={player.id}
								>
									<th className="index" scope="row">{player.index + 1}</th>
									<td>{player.full_name}</td>
									<td>
										{isTeamCaptain &&
											<i
												data-draggable-handle={true}
												className="fa fa-arrows"
												aria-hidden="true"
											>
											</i>
										}
									</td>
								</tr>
							);
						})}
					</tbody>
				</Table>
			);
		} else {
			return (
				<div
					ref={(el) => {setRef(el, id);}}
					className="empty-roster-table"
				>
				</div>
			);

		}
	}

}

export class FullRosterTable extends React.Component {
	constructor(props) {
		super(props);

		this.state = { 
			team: {},
			players: [],
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
		if (this.userIsTeamCaptain()) {
			this.drake = Dragula([this.playingEl], {
				moves: function (el, source, handle, sibling) {
					return handle.dataset.draggableHandle; // elements are always draggable by default
				},
			}).on('drop', this.setNewRoster);
		}
	};

	setStateFromRosterData(data) {
		this.setState({
			team: data.team,
			players: data.batters.map((batter) => {
				return {
					id: batter.player.id,
					index: batter.index,
					full_name: batter.player.full_name,
				};
			}),
			loaded: true,
		});
	}

	setNewRoster = (el, source, target, siblings) => {
		let data = [...this.playingEl.childNodes].map((playerNode, i) => {
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

	setRef = (el, id) => {
		this[id] = el;
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
						<h4>Roster</h4>
						<DroppableRosterTable
							isTeamCaptain={isTeamCaptain}
							players={this.state.players}
							id="playingEl"
							setRef={this.setRef}
						/>
					</div>
				</div>
			</SpinLoader>
		);
	}
}

import { Table } from 'reactstrap';
import ajax from 'common/ajax';
import Dragula from 'react-dragula';
import SpinLoader from 'components/spinloader';

class DroppableRosterTable extends React.Component {

	render() {

		let {players, isTeamCaptain, id, setRef} = this.props;

		if (players.length) {
			return (
				<Table responsive className="leagion-table">
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
									<td>{player.index + 1}</td>
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

	// On mobile this prevents the default page scrolling while dragging an item.
	stopScrolling(e) {
		e.preventDefault();
	}

	setUpDragging = (el) => {
		if (this.userIsTeamCaptain()) {
			this.drake = Dragula([this.playingEl], {
				moves: function (el, source, handle, sibling) {
					return handle.dataset.draggableHandle; // elements are always draggable by default
				},
			})
			.on('drop', this.setNewRoster)
			.on('drag', (el, source) => {
				document.addEventListener('touchstart', this.stopScrolling);
			});
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
		// let the user scroll the page again
		document.removeEventListener('touchstart', this.stopScrolling);

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


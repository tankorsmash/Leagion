import { Table } from 'components/tables';
import ajax from 'common/ajax';
import Dragula from 'react-dragula';
import SpinLoader from 'components/spinloader';

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

    setNewRoster = (newData) => {
        const data = newData.map((player, i) => {
            return {
                player_id: player.id,
                roster: this.props.rosterId,
                index: i,
            };
        });

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
                        <Table responsive striped
                            draggable={isTeamCaptain}
                            data={this.state.players}
                            onDrop={this.setNewRoster}
                            columns={[
                                {header: '#', cell: (player) => player.index + 1},
                                {header: 'Name', cell: 'full_name'},
                            ]}
                        />
                    </div>
                </div>
            </SpinLoader>
        );
    }
}


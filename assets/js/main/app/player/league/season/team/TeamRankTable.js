import {compose, setDisplayName} from 'recompose';

import {Link} from 'components/buttons';
import {Table} from 'components/tables';
import urls from 'main/app/player/urls';

const enhance = compose(
	setDisplayName('TeamRankTable'),
);
export default enhance(({leagueId, seasonId, teams}) => {
    const sortedTeams = teams.sort((teamA, teamB) => {
        return teamA.win_draw_loss_points.points < teamB.win_draw_loss_points.points;
    });

	return (
        <Table responsive striped
            data={sortedTeams}
            columns={[
                {header: 'Rank', cell: (team, i) => i + 1},
                {header: 'Team Name', cell: (team) => (
                    <Link
                        url={urls.teamDetail}
                        args={{
                            leagueId: leagueId,
                            seasonId: seasonId,
                            teamId: team.id,
                        }}
                    >
                        {team.name}
                    </Link>)
                },
                {header: 'Wins', cell: (team) => team.win_draw_loss_points.wins},
                {header: 'Ties', cell: (team) => team.win_draw_loss_points.draws},
                {header: 'Losses', cell: (team) => team.win_draw_loss_points.losses},
                {header: 'Points', cell: (team) => team.win_draw_loss_points.points},
            ]}
        />
	);
});

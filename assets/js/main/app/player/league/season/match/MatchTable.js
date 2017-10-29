import {Link} from 'components/buttons';
import urls from 'main/app/player/urls';
import { Table } from 'components/tables';

import {compose, setDisplayName} from 'recompose';

const enhance = compose(
	setDisplayName('MatchTable'),
);
export default enhance(({matches, seasonId, leagueId}) => {
    return (
        <Table responsive striped
            data={matches}
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
});

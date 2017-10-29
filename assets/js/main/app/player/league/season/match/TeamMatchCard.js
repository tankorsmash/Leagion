import {compose, setDisplayName} from 'recompose';

import {Avatar} from 'components/media';
import {FullRosterTable} from 'components/app/roster';
import MatchScoreSetter from 'main/app/player/league/season/match/MatchScoreSetter';

const enhance = compose(
	setDisplayName('TeamMatchCard'),
);
export default enhance((props) => {
    const {
        title, user, rosterId, team, score,
        completed, home_team, away_team, matchId, updateScore
    } = props;

    let scoreEl;

    if (completed) {
        scoreEl = <h2>{score}</h2>;
    } else {
        scoreEl = (
            <span>
                <h2>N/A</h2>
                {user.captain_of_teams.includes(team.id) &&
                    <MatchScoreSetter
                        home_team={home_team}
                        away_team={away_team}
                        matchId={matchId}
                        updateScore={updateScore}
                    />
                }
            </span>
        );
    }

    return (
        <div className="team-match-card le-card">
            <div
                className="team-match-card-header"
                style={{borderBottom: '5px solid ' + team.color_value}}
            >
                <h3 className="team-match-card-title font-weight-bold">
                    {title}
                </h3>
                <Avatar
                    style={{border: '5px solid ' + team.color_value}}
                        className="team-logo"
                        size="md"
                        src={team.logo_url}
                />
                <h3>{team.name}</h3>
                {scoreEl}
            </div>
            <FullRosterTable
                user={user}
                rosterId={rosterId}
            />
        </div>
    );
});

import {compose, setDisplayName} from 'recompose';

import {Avatar} from 'components/media';
import {MatchScoreSetter} from 'components/app/match';

const enhance = compose(
	setDisplayName('TeamMatchCardMobile'),
);
export default enhance((props) => {
    const {
        user, score, team, completed,
        home_team, away_team, matchId, updateScore,
        noTopBorder
    } = props;

    let style = {};
    if (noTopBorder) {
        style.borderTop = 'none';
    }

    return (
        <div className="team-match-card-mobile le-card" style={style}>
            <Avatar
                style={{border: '5px solid ' + team.color_value}}
                className="team-logo"
                size="sm"
                src={team.logo_url}
            />
            <span className="team-name">
                <h4>{team.name}</h4>
                {!completed && user.captain_of_teams.includes(team.id) &&
                    <MatchScoreSetter
                        home_team={home_team}
                        away_team={away_team}
                        matchId={matchId}
                        updateScore={updateScore}
                    />
                }
            </span>
            <h2>{completed ? score : "N/A"}</h2>
        </div>
    );
});

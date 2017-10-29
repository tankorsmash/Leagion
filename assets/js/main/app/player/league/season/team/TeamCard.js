import {compose, setDisplayName } from 'recompose';

import {Avatar} from 'components/media';
import {Link} from 'components/buttons';

import urls from 'main/app/player/urls';

const enhance = compose(
    setDisplayName('TeamCard'),
);
export default enhance(({team}) => {
    let matchComp = null;
    if (team.matches.length > 0) {
        let match = team.matches[0];

        matchComp = (
            <span>
                <Link
                    url={urls.matchDetail}
                    args={{
                        leagueId: team.season.league.id,
                        seasonId: team.season.id,
                        matchId: match.id
                    }}
                >
                    {match.pretty_date}
                </Link>
            </span>
        );

    } else {
        matchComp = (
            <span>
                No Matches for this team yet
            </span>
        );
    }

    return (
        <div className="team-card">
            <div className="team-card-top">
                <div>
                    <Avatar className="team-logo" size="md" src={team.logo_url}  />
                </div>
                <div className="h4 team-title">
                    <Link
                        url={urls.teamDetail}
                        args={{
                            leagueId: team.season.league.id,
                            seasonId: team.season.id,
                            teamId: team.id,
                        }}
                    >
                        {team.name}
                    </Link>
                </div>
            </div>
            <div
                className="team-card-bottom"
                style={{backgroundColor: team.color_value}}
            >
                <div className="h5">
                    <Link
                        url={urls.leagueDetail}
                        args={{leagueId: team.season.league.id}}
                    >
                        {team.season.league.name}
                    </Link>
                </div>
                <div className="h5">
                    <Link
                        url={urls.seasonDetail}
                        args={{
                            leagueId: team.season.league.id,
                            seasonId: team.season.id
                        }}
                    >
                        {team.season.pretty_date}
                    </Link>
                </div>
                <div className="p pt-2">upcoming match:</div>
                <div className="small">{matchComp}</div>
            </div>
        </div>
    );
});

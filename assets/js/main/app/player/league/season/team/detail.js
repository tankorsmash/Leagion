import { withState, compose, setDisplayName } from 'recompose';

import reverse from 'common/reverse';

import SpinLoader from 'components/spinloader';
import {Titlebar} from 'components/text';
import {TeamTitle, TeamInfoTab} from 'components/app/team';
import DatasetView from 'components/DatasetView';
import {Tabs} from 'components/tabs';

import {MatchTable} from 'components/app/match';
import {PlayerAvatarList} from 'components/app/player';

const enhance = compose(
    setDisplayName('TeamDetail'),
    withState('team', 'setTeam', null),
);
export default enhance(({team, setTeam, user, constants, match}) => {
    const isCaptain = team && team.captains.includes(user.id);

    return (
        <DatasetView
            url={reverse(
                'api-team-detail',
                {team_id: match.params.teamId}
            )}
            onSuccess={(team) => setTeam(team)}
        >
            { team &&
                <div>
                    <Titlebar title="My Team" />
                    <div className="team-detail-header">
                        <TeamTitle team={team} />
                    </div>
                    <Tabs
                        className="team-match-table"
                        tabs={[{
                            label: 'Matches',
                            content: (<MatchTable
                                matches={team.matches}
                                seasonId={team.season.id}
                                leagueId={team.season.league_id}
                            />),
                        }, {
                            label: 'Team Members',
                            content: <PlayerAvatarList players={team.players}/>
                        }, {
                            label: 'Team Details',
                            content: <TeamInfoTab
                                team={team}
                                user={user}
                                constants={constants}
                                isCaptain={isCaptain}
                            />
                        }]}
                    />
                </div>
            }
        </DatasetView>
    );
});

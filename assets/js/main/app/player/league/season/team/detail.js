import { withState, compose, setDisplayName } from 'recompose';

import reverse from 'common/reverse';

import {Titlebar} from 'components/text';
import DatasetView from 'components/DatasetView';
import {Tabs} from 'components/tabs';

import {MatchTable} from 'components/app/match';
import {PlayerAvatarList} from 'components/app/player';

import TeamTitle from 'main/app/player/league/season/team/TeamTitle';
import TeamColorUploader from 'main/app/player/league/season/team/TeamColorUploader';
import TeamLogoUploader from 'main/app/player/league/season/team/TeamLogoUploader';

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
                            content: (
                                <div className="team-details">
                                    <TeamLogoUploader team={team} setTeam={setTeam} user={user} isCaptain={isCaptain} />
                                    <TeamColorUploader team={team} setTeam={setTeam} user={user} isCaptain={isCaptain} constants={constants} />
                                </div>
                            )
                        }]}
                    />
                </div>
            }
        </DatasetView>
    );
});

import { withState, compose, setDisplayName } from 'recompose';

import reverse from 'common/reverse';

import {Titlebar} from 'components/misc';
import DatasetView from 'components/DatasetView';
import {Tabs} from 'components/tabs';

import MatchTable from 'main/app/player/league/season/match/MatchTable';
import PlayerAvatarList from 'main/app/player/league/season/team/PlayerAvatarList';

import TeamTitle from 'main/app/player/league/season/team/TeamTitle';
import TeamColorUploader from 'main/app/player/league/season/team/TeamColorUploader';
import TeamLogoUploader from 'main/app/player/league/season/team/TeamLogoUploader';

const enhance = compose(
    setDisplayName('TeamDetail'),
    withState('team', 'setTeam', null),
);
export default enhance(({team, setTeam, user, constants, match}) => {
    const isCaptain = team && team.captains.includes(user.id);

    let tabs = [{
        label: 'Matches',
        content: (<MatchTable
            matches={team.matches}
            seasonId={team.season.id}
            leagueId={team.season.league.id}
        />),
    }, {
        label: 'Team Members',
        content: <PlayerAvatarList players={team.players}/>
    }];

    if (isCaptain) {
        tabs.push({
            label: 'Team Details',
            content: (
                <div className="team-details">
                    <TeamLogoUploader
                        team={team}
                        url={reverse("api-my-team-detail", {team_id: team.id})}
                        onSuccess={(data)=> {setTeam(data);}}
                    />
                    <TeamColorUploader team={team} setTeam={setTeam} user={user} constants={constants} />
                </div>
            )
        })
    }

    return (
        <DatasetView
            url={reverse(
                'api-my-team-detail',
                {team_id: match.params.teamId}
            )}
            refreshObject={match}
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
                        tabs={tabs}
                    />
                </div>
            }
        </DatasetView>
    );
});

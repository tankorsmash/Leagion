import SpinLoader from 'components/spinloader';
import {Titlebar} from 'components/text';

import {MatchTable} from 'components/app/match';
import {PlayerAvatarList} from 'components/app/player';
import {TeamTitle, TeamInfoTab} from 'components/app/team';
import DatasetView from 'components/dataset_view';
import {Tabs} from 'components/tabs';

export default class TeamDetail extends DatasetView {
    get datasetStateAttr() {
        return "team";
    }

    get datasetViewName() {
        return "api-team-detail";
    }

    get datasetViewKwargs() {
        return {team_id: this.props.match.params.teamId};
    }

    render() {
        const team = this.state.team;

        return (
            <SpinLoader loaded={this.getIsLoaded()}>
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
                                content: <TeamInfoTab team={team}/>
                            }]}
                        />
                    </div>
                }
            </SpinLoader>
        );
    }
}

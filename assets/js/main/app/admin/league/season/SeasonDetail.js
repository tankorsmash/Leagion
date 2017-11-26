import {compose, setDisplayName, withState} from 'recompose';
import FontAwesome from 'react-fontawesome';

import {Titlebar} from 'components/misc';
import DatasetView from 'components/DatasetView';
import {Tabs} from 'components/tabs';

import TeamTable from './teams/TeamTable';

const enhance = compose(
    setDisplayName('SeasonDetail'),
    withState('season', 'setSeason', {}),
    withState('teams', 'setTeams', []),
    withState('matches', 'setMatches', []),
    withState('players', 'setPlayers', []),
    withState('refresh', 'setRefresh', false),
);

export default enhance(({season, setSeason, user, match,
    refresh, setRefresh, setTeams, teams}) => {
    return (
        <DatasetView
            url={reverse('api-season-detail', {season_id: match.params.seasonId})}
            onSuccess={(season) => { setSeason(season); }}
            refresh={refresh} setRefresh={setRefresh}
        >
            <Titlebar
                title={season.pretty_name}
            />
            <div className="content le-listing">
                <Tabs
                    tabs={[{
                        label: 'Teams',
                        content: <TeamTable
                            season={season}
                            user={user}
                            setRefresh={setRefresh}
                            setTeams={setTeams}
                            teams={teams}
                        />,
                    }, {
                        label: 'Matches',
                        content: <h3>matches table</h3>
                    }, {
                        label: 'Players',
                        content: <h3>player table</h3>
                    }]}
                />
            </div>
        </DatasetView>
    );
});

import {compose, setDisplayName, withState} from 'recompose';

import {Titlebar} from 'components/misc';
import DatasetView from 'components/DatasetView';
import {Tabs} from 'components/tabs';

import TeamTable from './team/TeamTable';
import MatchTable from './match/MatchTable';
import PlayerTable from './player/PlayerTable';
import LocationTable from 'main/app/admin/league/location/LocationTable';

const enhance = compose(
    setDisplayName('SeasonDetail'),
    withState('season', 'setSeason', {}),
    withState('refresh', 'setRefresh', false),
    withState('tab', 'setTab', 0),
);

export default enhance(({season, setSeason, user, match,
    refresh, setRefresh, tab, setTab}) => {
    return (
        <DatasetView
            url={reverse('api-my-comm-season-detail', {season_id: match.params.seasonId})}
            onSuccess={(season) => { setSeason(season); }}
            refresh={refresh} setRefresh={setRefresh}
        >
            <Titlebar
                title={season.pretty_name}
            />
            <div className="">
                <Tabs
                    activeTab={tab}
                    setTab={setTab}
                    tabs={[{
                        label: 'Teams',
                        content: <TeamTable
                            season={season}
                            user={user}
                            setRefresh={setRefresh}
                        />,
                    }, {
                        label: 'Matches',
                        content: <MatchTable
                            season={season}
                            user={user}
                            setRefresh={setRefresh}
                        />,
                    }, {
                        label: 'Players',
                        content: <PlayerTable
                            season={season}
                            user={user}
                            setRefresh={setRefresh}
                        />,
                    }, {
                        label: 'Locations',
                        content: <LocationTable
                            season={season}
                            user={user}
                            setRefresh={setRefresh}
                        />,
                    }]}
                />
            </div>
        </DatasetView>
    );
});

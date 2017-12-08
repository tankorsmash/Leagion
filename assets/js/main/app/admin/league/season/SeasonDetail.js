import {compose, setDisplayName, withState} from 'recompose';
import FontAwesome from 'react-fontawesome';

import {Titlebar} from 'components/misc';
import DatasetView from 'components/DatasetView';
import {Tabs} from 'components/tabs';

import TeamTable from './team/TeamTable';
import MatchTable from './match/MatchTable';

const enhance = compose(
    setDisplayName('SeasonDetail'),
    withState('season', 'setSeason', {}),
    withState('refresh', 'setRefresh', false),
);

export default enhance(({season, setSeason, user, match,
    refresh, setRefresh}) => {
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
                        content: <h3>player table</h3>
                    }]}
                />
            </div>
        </DatasetView>
    );
});
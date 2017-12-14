import {compose, setDisplayName, withState} from 'recompose';

import {Titlebar} from 'components/misc';
import DatasetView from 'components/DatasetView';
import LeagueCard from './LeagueCard';
import LeagueCreateModal from './LeagueCreateModal';


const enhance = compose(
    setDisplayName('LeagueList'),
    withState('leagues', 'setLeagues', []),
    withState('refresh', 'setRefresh', false),
);

export default enhance(({leagues, setLeagues, user, refresh, setRefresh}) => {
    return (
        <DatasetView
            url={reverse('api-my-comm-league-list')}
            refresh={refresh} setRefresh={setRefresh}
            onSuccess={(leagues) => {setLeagues(leagues);}}
        >
            <Titlebar
                title="Manage Your Leagues"
                right={(
                    <LeagueCreateModal
                        user={user}
                        onSuccess={() => {setRefresh(true);}}
                    />
                )}
            />
            <div className="content le-listing">
                {leagues.map((league, i) => {
                    return (
                        <LeagueCard
                            league={league} key={i}
                            setRefresh={setRefresh}
                        />
                    );
                })}
            </div>
        </DatasetView>
    );
});

import {compose, setDisplayName, withState} from 'recompose';
import FontAwesome from 'react-fontawesome';

import {Titlebar} from 'components/text';
import DatasetView from 'components/DatasetView';
import LeagueCard from './LeagueCard';
import LeagueCreateModal from './LeagueCreateModal';
import {Button} from 'components/buttons';

//import LeagueCard from 'main/app/admin/league/LeagueCard';

const enhance = compose(
    setDisplayName('LeagueList'),
    withState('leagues', 'setLeagues', []),
    withState('refresh', 'setRefresh', false),
);

export default enhance(({leagues, setLeagues, user, refresh, setRefresh}) => {
    return (
        <DatasetView
            url={reverse('api-my-league-commissioned-list')}
            refresh={refresh} setRefresh={setRefresh}
            onSuccess={(leagues) => {
                setLeagues(leagues);
                setRefresh(false);
            }}
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

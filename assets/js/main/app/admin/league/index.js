import {compose, setDisplayName, withState} from 'recompose';

import {Titlebar} from 'components/text';
import DatasetView from 'components/DatasetView';
import LeagueCard from './LeagueCard';

//import LeagueCard from 'main/app/admin/league/LeagueCard';

const enhance = compose(
    setDisplayName('LeagueList'),
    withState('leagues', 'setLeagues', []),
);

export default enhance(({leagues, setLeagues}) => {
    return (
        <DatasetView
            url={reverse('api-league-list')}
            onSuccess={(leagues) => setLeagues(leagues)}
        >
            <Titlebar title="Manage Your Leagues" />
            <div className="content le-listing">
                {leagues.map((league, i) => {
                    return <LeagueCard league={league} key={i}/>;
                })}
            </div>
        </DatasetView>
    );
});

import {compose, setDisplayName, withState} from 'recompose';
import FontAwesome from 'react-fontawesome';

import {Titlebar} from 'components/text';
import DatasetView from 'components/DatasetView';
import LeagueCard from './LeagueCard';
import {Button} from 'components/buttons';

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
            <Titlebar
                title="Manage Your Leagues"
                right={(
                    <Button color="primary" size="md" >
                        <FontAwesome name="plus"/> {'Create New League'}
                    </Button>
                )}
            />
            <div className="content le-listing">
                {leagues.map((league, i) => {
                    return <LeagueCard league={league} key={i}/>;
                })}
            </div>
        </DatasetView>
    );
});

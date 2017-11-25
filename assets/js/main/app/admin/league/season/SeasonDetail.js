import {compose, setDisplayName, withState} from 'recompose';
import FontAwesome from 'react-fontawesome';

import {Titlebar} from 'components/text';
import DatasetView from 'components/DatasetView';
import {Tabs} from 'components/tabs';

import TeamTable from './teams/TeamTable';

const enhance = compose(
    setDisplayName('SeasonDetail'),
    withState('season', 'setSeason', {}),
);

export default enhance(({season, setSeason, user, match}) => {
    return (
        <DatasetView
            url={reverse('api-season-detail', {season_id: match.params.seasonId})}
            onSuccess={(season) => { setSeason(season); }}
        >
            <Titlebar
                title={season.pretty_name}
            />
            <div className="content le-listing">
                <Tabs
                    tabs={[{
                        label: 'Teams',
                        content: <TeamTable season={season}/>,
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

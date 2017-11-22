import {compose, setDisplayName, withState} from 'recompose';
//import FontAwesome from 'react-fontawesome';

import {Titlebar} from 'components/text';
import DatasetView from 'components/DatasetView';

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
                Here be dragons
            </div>
        </DatasetView>
    );
});

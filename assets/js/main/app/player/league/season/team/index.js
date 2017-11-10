import {compose, setDisplayName, withState} from 'recompose';

import {Titlebar} from 'components/text';
import DatasetView from 'components/DatasetView';

import TeamCard from 'main/app/player/league/season/team/TeamCard';

const enhance = compose(
    setDisplayName('TeamList'),
    withState('teams', 'setTeams', []),
);

export default enhance(({teams, setTeams}) => {
    return (
        <DatasetView
            url={reverse('api-my-team-list')}
            onSuccess={(teams) => setTeams(teams)}
        >
            <Titlebar title="My Teams" />
            <div className="content le-listing">
                {teams.map((team, i) => {
                    return (
                        <TeamCard key={i} team={team} />
                    );
                })}
            </div>
        </DatasetView>
    );
});

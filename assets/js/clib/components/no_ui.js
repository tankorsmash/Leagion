import {BaseComponent} from './base';

export class DatasetViewComp extends BaseComponent {
    title = 'DatasetView';
	description = 'Use this to fetch data then display\
	the children when it is fetched';

    renderCode() {
        return (
`import DatasetView from 'components/DatasetView';
const enhance = compose(
    setDisplayName('MyComponent'),
    withState('data', 'setData', null),
);
export default enhance(({team, setTeam, match}) => {
    return (
        <DatasetView
            url={reverse(
                'api-team-detail',
                {team_id: match.params.teamId}
            )}
            onSuccess={(team) => setTeam(team)}
        >
		{/* insert children here */}
        </DatasetView>
    );
});
`
        );
    }

    renderComponent() {
		return null;
    }
}

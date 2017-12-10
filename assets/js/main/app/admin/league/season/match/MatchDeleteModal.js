import {compose, setDisplayName } from 'recompose';
import {SimpleModal} from 'components/modals';
import ajax from 'common/ajax';

const enhance = compose(
    setDisplayName('MatchDeleteModal'),
);
export default enhance(({onSuccess, match, Opener}) => {
    const message = `Are you sure you want to delete the match
    between "${match.home_team.name}" and "${match.away_team.name}" on "${match.pretty_date}"?`;
    return (
        <SimpleModal
            size="sm" title="Delete Match" Opener={Opener}
            submitText="Confirm" body={<p>{message}</p>}
            onSubmit={() => {
                ajax({
                    url: reverse('api-my-comm-match-detail', {match_id: match.id}),
                    method: 'DELETE',
                }).then(data => {
                    toastr.success(`match between between "${match.home_team.name}" and "${match.away_team.name}" on "${match.pretty_date}" deleted!`);
                    onSuccess();
                }).catch(data => {
                    toastr.error(data);
                });
            }}
        />
    );
});

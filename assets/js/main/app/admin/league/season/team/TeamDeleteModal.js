import {compose, setDisplayName } from 'recompose';
import {SimpleModal} from 'components/modals';
import ajax from 'common/ajax';

const enhance = compose(
    setDisplayName('TeamDeleteModal'),
);
export default enhance(({onSuccess, team, Opener}) => {
    const message = `Are you sure you want to delete the team: "${team.name}"?`;
    return (
        <SimpleModal
            size="sm" title="Delete Team" Opener={Opener}
            submitText="Confirm" body={<p>{message}</p>}
            onSubmit={() => {
                ajax({
                    url: reverse('api-my-comm-team-detail', {team_id: team.id}),
                    method: 'DELETE',
                }).then(data => {
                    toastr.success(`team: "${team.name}" deleted!`);
                    onSuccess();
                }).catch(data => {
                    toastr.error(data);
                });
            }}
        />
    );
});

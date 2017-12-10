import {compose, setDisplayName } from 'recompose';
import {SimpleModal} from 'components/modals';
import ajax from 'common/ajax';

const enhance = compose(
    setDisplayName('PlayerRemoveFromSeasonModal'),
);
export default enhance(({onSuccess, player, Opener}) => {
    const message = `Are you sure you want to remove the player: "${player.full_name}" from this season?`;
    return (
        <SimpleModal
            size="sm" title="Remove Player From Season" Opener={Opener}
            submitText="Confirm" body={<p>{message}</p>}
            onSubmit={() => {
                ajax({
                    url: reverse('api-my-comm-team-detail', {player: player.id}),
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

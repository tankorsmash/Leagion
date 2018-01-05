import {compose, setDisplayName } from 'recompose';
import {SimpleModal} from 'components/modals';
import ajax from 'common/ajax';

const enhance = compose(
    setDisplayName('PlayerRemoveFromTeamModal'),
);
export default enhance(({onSuccess, team, Opener, player}) => {
    const message = `Are you sure you want to remove "${player.full_name}" form the team: "${team.name}"?`;
    return (
        <SimpleModal
            size="sm" title="Remove From Team" Opener={Opener}
            submitText="Confirm" body={<p>{message}</p>}
            onSubmit={() => {
                ajax({
                    url: reverse('api-my-comm-player-detail', {player_id: player.id}),
                    method: 'PATCH',
                    data: {
                        'remove_team_id': team.id,
                    },
                }).then(data => {
                    toastr.success(`Player "${player.full_name}" removed from team "${team.name}"`);
                    onSuccess();
                }).catch(data => {
                    toastr.error(data);
                });
            }}
        />
    );
});

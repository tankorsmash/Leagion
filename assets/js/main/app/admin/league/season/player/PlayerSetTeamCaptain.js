import {compose, setDisplayName } from 'recompose';
import {SimpleModal} from 'components/modals';
import ajax from 'common/ajax';

const enhance = compose(
    setDisplayName('PlayerSetTeamCaptain'),
);
export default enhance(({set, onSuccess, team, Opener, player}) => {
    const message = set ?
        `Are you sure you want to make "${player.full_name}" the team captain of the team: "${team.name}"?` :
        `Are you sure you want to remove "${player.full_name}" from being a team captain of the team: "${team.name}"?`;
    const title = set ? "Make Captain" : "Remove From Captains";
    const success = set ?
        `Player "${player.full_name}" is now a captain of the team: "${team.name}"`:
        `Player "${player.full_name}" is no longer a captain of the team: "${team.name}"`;

    const data = set ? {add_captain_team_id: team.id} : {remove_captain_team_id: team.id};

    return (
        <SimpleModal
            size="sm" title={title} Opener={Opener}
            submitText="Confirm" body={<p>{message}</p>}
            onSubmit={() => {
                ajax({
                    url: reverse('api-my-comm-player-detail', {player_id: player.id}),
                    method: 'PATCH',
                    data: data,
                }).then(data => {
                    toastr.success(success);
                    onSuccess();
                }).catch(data => {
                    toastr.error(data);
                });
            }}
        />
    );
});

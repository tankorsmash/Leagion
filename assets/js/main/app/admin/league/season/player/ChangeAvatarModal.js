import {compose, setDisplayName } from 'recompose';
import {SimpleModal} from 'components/modals';
import ChangeAvatarForm from 'main/app/player/account/avatar.js';

const enhance = compose(
    setDisplayName('TeamEditModal'),
);
export default enhance(({player, onSuccess, Opener}) => {
    return (
        <SimpleModal
            size="md" title={'Change avatar for: ' + player.full_name}
            Opener={Opener}
            body={
                <div className="text-center">
                    <ChangeAvatarForm
                        onSuccess={onSuccess}
                        user={player}
                        url={reverse('api-my-comm-player-detail', {player_id: player.id})}
                    />
                </div>
            }
            submitText="Ok"
        />
    );
});

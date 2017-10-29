import {compose, setDisplayName} from 'recompose';

import {Link} from 'components/buttons';
import {Avatar} from 'components/media';
import urls from 'main/app/player/urls';

const enhance = compose(
	setDisplayName('PlayerAvatarList'),
);
export default enhance(({players}) => {
    return (
        <div className="player-avatar-list">
            {players.map((player, i) => {
                return (
                    <div key={i} className="player-avatar">
                        <Link
                            url={urls.profileDetail}
                            args={{playerId: player.id}}
                        >
                            <Avatar
                                className="player-avatar-pic"
                                size="md"
                                src={player.avatar_url}
                            />
                            <div>
                            {player.full_name}
                            </div>
                        </Link>
                    </div>
                );
            })}
        </div>
    );
});

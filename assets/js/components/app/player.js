import { Table } from 'components/tables';
import urls from 'main/app/player/urls';
import {Link} from 'components/buttons';
import {Avatar} from 'components/media';

export const TeamPlayerTable = (props) => {
    return (
        <Table responsive striped
            data={props.players}
            columns={[
                {header: 'Name', cell: 'full_name'},
                {header: 'Email', cell: 'email'},
            ]}
        />
    );
};

export const PlayerAvatarList = (props) => {
    return (
        <div className="player-avatar-list">
            {props.players.map((player, i) => {
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
};



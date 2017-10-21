import { Table } from 'components/tables';
import Gravatar from 'react-gravatar';
import urls from 'main/app/player/urls';
import {Link} from 'components/buttons';

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

export const PlayerAvatar = (props) => {
    return (
        <div className="player-avatar">
            <Gravatar className="player-avatar-pic" size={props.size} email={props.email} default="mm" />
            <div
                className="player-avatar-name"
                style={{width: props.size + 'px'}}
            >
                {props.children}
            </div>
        </div>
    );
};

export const PlayerAvatarList = (props) => {
    return (
        <div className="player-avatar-list">
            {props.players.map((player, i) => {
                return (
                    <PlayerAvatar
                        key={i}
                        size={props.size}
                        email={player.email}
                    >
                        <Link
                            url={urls.profileDetail}
                            args={{playerId: player.id}}
                        >
                            {player.full_name}
                        </Link>
                    </PlayerAvatar>
                );
            })}
        </div>
    );
};



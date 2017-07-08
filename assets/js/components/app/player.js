import { Table } from 'reactstrap';
import Gravatar from 'react-gravatar';

export const TeamPlayerTable = (props) => {
    return (
        <Table striped>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                </tr>
            </thead>
            <tbody>
                {props.players.map((player, i) => {
                    return (
                        <tr key={i}>
                            <td>{player.full_name}</td>
                            <td>{player.email}</td>
                        </tr>
                    );
                })}
            </tbody>
        </Table>
    );
};

export const PlayerAvatar = (props) => {
    return (
        <div className="player-avatar">
            <Gravatar className="player-avatar-pic" size={props.size} email={props.email} default="mm" />
            <div className="player-avatar-name">
                {props.name}
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
                        name={player.full_name}
                        email={player.email}
                    />
                );
            })}
        </div>
    );
};



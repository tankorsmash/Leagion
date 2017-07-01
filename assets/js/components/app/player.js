import { Table } from 'reactstrap';

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
            <div className="player-avatar-pic">
            </div>
            <div className="player-avatar-name">
                {props.full_name}
            </div>
        </div>
    );
};

export const PlayerAvatarList = (props) => {
    return (
        <div className="player-avatar-list">
            {props.players.map((player, i) => {
                return <PlayerAvatar key={i} player={player} />;
            })}
        </div>
    );
};



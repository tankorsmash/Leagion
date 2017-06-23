import React from 'react';
import { Table } from 'reactstrap';

const TeamPlayerTable = (props) => {
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
                    )
                })}
            </tbody>
        </Table>
    );
}

module.exports = {
    TeamPlayerTable: TeamPlayerTable,
}



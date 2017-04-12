import {Link} from 'react-router-dom';
import { ListGroup, ListGroupItem, Table } from 'reactstrap';
import matchUrls from 'main/app/player/match/urls';
import {TeamLink} from 'components/app/team';

const MatchLink = (props) => {
	return (
		<Link to={`${matchUrls.index}/${props.id}`}>
			{props.text}
		</Link>
	);
};

const MatchTable = (props) => {
    return (
        <Table>
            <thead>
                <tr>
                    <th>Home Team</th>
                    <th></th>
                    <th>Away Team</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Location</th>
                </tr>
            </thead>
            <tbody>
                {props.matches.map((match, i) => {
                    return (
                        <tr key={i}>
							<td><TeamLink id={match.home_team.id} text={match.home_team.name}/></td>
                            <td>vs.</td>
							<td><TeamLink id={match.away_team.id} text={match.away_team.name}/></td>
                            <td>{match.pretty_date}</td>
                            <td>{match.pretty_time}</td>
                            <td>{match.location.name}</td>
                        </tr>
                    )
                })}
            </tbody>
        </Table>
    );
}

const MatchList = (props) => {
	return (
		<ListGroup>
			{props.matches.map((match, i) => {
				return (
					<ListGroupItem key={i}>
						<Link to={`${matchUrls.index}/${match.id}`}>
							{match.pretty_name}
						</Link>
					</ListGroupItem>
				)
			})}
		</ListGroup>
	);
};

module.exports = {
	MatchList: MatchList,
	MatchTable: MatchTable,
	MatchLink: MatchLink,
}


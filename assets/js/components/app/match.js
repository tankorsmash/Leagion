import {Link} from 'react-router-dom';
import { ListGroup, ListGroupItem, Table } from 'reactstrap';
import { Card, CardBlock, CardTitle, CardSubtitle, CardText } from 'reactstrap';
import matchUrls from 'main/app/player/match/urls';
import {TeamLink} from 'components/app/team';
import ajax from 'common/ajax';

export const MatchLink = (props) => {
	return (
		<Link to={`${matchUrls.index}/${props.id}`}>
			{props.text}
		</Link>
	);
};

export const MatchTable = (props) => {
    return (
        <Table responsive>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Home Team</th>
                    <th></th>
                    <th>Away Team</th>
                    <th>Location</th>
                    <th>Results</th>
                </tr>
            </thead>
            <tbody>
                {props.matches.map((match, i) => {
                    return (
                        <tr key={i}>
                            <td><MatchLink id={match.id} text={match.pretty_date}/></td>
                            <td>{match.pretty_time}</td>
							<td><TeamLink id={match.home_team.id} text={match.home_team.name}/></td>
                            <td>vs.</td>
							<td><TeamLink id={match.away_team.id} text={match.away_team.name}/></td>
                            <td>{match.location.name}</td>
                            <td>{match.home_points} - {match.away_points}</td>
                        </tr>
                    );
                })}
            </tbody>
        </Table>
    );
};

export const MatchList = (props) => {
	return (
		<ListGroup>
			{props.matches.map((match, i) => {
				return (
					<ListGroupItem key={i}>
						<Link to={`${matchUrls.index}/${match.id}`}>
							{match.pretty_name}
						</Link>
					</ListGroupItem>
				);
			})}
		</ListGroup>
	);
};

export const MatchCard = (props) => {
    let match = props.match;

    return (
        <div>
            <Card>
                <CardBlock>
                    <CardTitle className="text-center">
                        <Table> 
                            <thead>
                                <tr>
                                    <th className="text-center"><TeamLink id={match.home_team.id} text={match.home_team.name}/></th>
                                    <th className="text-center">vs.</th>
                                    <th className="text-center"><TeamLink id={match.away_team.id} text={match.away_team.name}/></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{match.home_points}</td>
                                    <td></td>
                                    <td>{match.away_points}</td>
                                </tr>
                            </tbody>
                        </Table>
                        {match.pretty_date}
                        <br/>
                        {match.pretty_time}
                    </CardTitle>
                    <CardSubtitle></CardSubtitle>
                    <CardText>
                    </CardText>
                </CardBlock>
            </Card>
        </div>
    );
};

export class BattingOrderTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = { 
            players: [],
            loaded: false
        };
    }

    componentDidMount() {
        ajax({
            url: reverse('api-roster-detail', {roster_id: this.props.rosterId}),
        }).then(data => {
            this.setState({
                players: data.players || {},
                loaded: true
            });
        });
    }

    render() {
        return (
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.players.map((batter, i) => {
                        return (
                            <tr key={i}>
                                <th scope="row">{batter.index + 1}</th>
                                <td>{batter.player.full_name}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        );
    }
}

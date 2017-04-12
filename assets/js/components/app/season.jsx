import {Link} from 'react-router-dom';
import { Jumbotron, Card, CardBlock, CardTitle,
    CardSubtitle, CardText, Table } from 'reactstrap';
import seasonUrls from 'main/app/player/season/urls';
import teamUrls from 'main/app/player/team/urls';

const SeasonScheduleTable = (props) => {
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
                {props.season.matches.map((match, i) => {
                    return (
                        <tr key={i}>
                            <td>{match.home_team.name}</td>
                            <td>vs.</td>
                            <td>{match.away_team.name}</td>
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

const SeasonCard = (props) => {
    let season = props.season;

    return (
        <div>
            <Card>
                <CardBlock>
                    <CardTitle><Link to={`${seasonUrls.index}/${season.id}`}>{season.pretty_name}</Link></CardTitle>
                    <CardSubtitle>{season.sport}</CardSubtitle>
                    <CardText>
                        Team: {<Link to={`${teamUrls.index}/${season.my_team.id}`}>{season.my_team.name}</Link>}
                    </CardText>
                    <CardText>
                        Upcoming Match: 
                    </CardText>
                </CardBlock>
            </Card>
        </div>
    );
};


module.exports = {
	SeasonCard: SeasonCard,
	SeasonScheduleTable: SeasonScheduleTable,
}

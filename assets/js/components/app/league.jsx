import {Link} from 'react-router-dom';
import { Jumbotron } from 'reactstrap';
import leagueUrls from 'main/app/player/league/urls';
import {TeamCard} from 'components/app/team'
import {Col} from 'reactstrap';

const LeagueJumbo = (props) => {
	let league = props.league;

	return (
		<Jumbotron>
			<h2>
				<Link to={`${leagueUrls.index}/${league.id}`}>{league.name}</Link>
			</h2>
			{league.my_seasons.map((season, i) => {
				return (
					<Col md="6" key={i}>
						<TeamCard team={season.my_team} league={league} season={season}/>
					</Col>
				);
			})}
		</Jumbotron>
	);
};

module.exports = {
	LeagueJumbo: LeagueJumbo,
}

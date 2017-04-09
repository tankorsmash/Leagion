import {Link} from 'react-router-dom';
import { Jumbotron } from 'reactstrap';
import leagueUrls from 'main/app/player/league/urls';
import {SeasonCard} from 'components/app/season'

const LeagueJumbo = (props) => {
	let league = props.league;

	return (
		<Jumbotron>
			<h2>
				<Link to={`${leagueUrls.index}/${league.id}`}>{league.name}</Link>
			</h2>
			{league.my_seasons.map((season, i) => {
				return (<SeasonCard season={season} key={i} />);
			})}
		</Jumbotron>
	);
};

module.exports = {
	LeagueJumbo: LeagueJumbo,
}

import {Link} from 'react-router-dom';
import { Jumbotron } from 'reactstrap';
import leagueUrls from 'main/app/player/league/urls';
import {TeamCard} from 'components/app/team'
import {Col} from 'reactstrap';

const LeagueLink = (props) => {
	return (
		<Link to={`${leagueUrls.index}/${props.id}`}>
			{props.text}
		</Link>
	);
};

module.exports = {
	LeagueLink: LeagueLink,
}

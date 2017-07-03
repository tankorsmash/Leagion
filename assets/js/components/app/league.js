import {Link} from 'react-router-dom';
import leagueUrls from 'main/app/player/league/urls';

export const LeagueLink = (props) => {
	return (
		<Link to={`${leagueUrls.index}/${props.id}`}>
			{props.text}
		</Link>
	);
};

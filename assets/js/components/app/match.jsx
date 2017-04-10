import {Link} from 'react-router-dom';
import { ListGroup, ListGroupItem } from 'reactstrap';
import matchUrls from 'main/app/player/match/urls';

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
}


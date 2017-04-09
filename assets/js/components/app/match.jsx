import { ListGroup, ListGroupItem } from 'reactstrap';

const MatchList = (props) => {
	return (
		<ListGroup>
			{team.matches.map((match, i) => {
				return (
					<ListGroupItem>
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


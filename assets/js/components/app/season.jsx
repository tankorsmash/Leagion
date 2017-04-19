import {Link} from 'react-router-dom';
import { Jumbotron, Card, CardBlock, CardTitle,
    CardSubtitle, CardText } from 'reactstrap';
import seasonUrls from 'main/app/player/season/urls';
import teamUrls from 'main/app/player/team/urls';
import {TeamLink} from 'components/app/team';

const SeasonLink = (props) => {
	return (
		<Link to={`${seasonUrls.index}/${props.id}`}>
			{props.text}
		</Link>
	);
};

module.exports = {
	SeasonLink: SeasonLink,
}

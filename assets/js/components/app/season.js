import {Link} from 'react-router-dom';
import seasonUrls from 'main/app/player/season/urls';

export const SeasonLink = (props) => {
	return (
		<Link to={`${seasonUrls.index}/${props.id}`}>
			{props.text}
		</Link>
	);
};

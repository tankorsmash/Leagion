import {Link} from 'react-router-dom';
import { Jumbotron, Card, CardBlock, CardTitle,
    CardSubtitle, CardText } from 'reactstrap';
import seasonUrls from 'main/app/player/season/urls';
import teamUrls from 'main/app/player/team/urls';

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

const SeasonLink = (props) => {
	return (
		<Link to={`${seasonUrls.index}/${props.id}`}>
			{props.text}
		</Link>
	);
};

module.exports = {
	SeasonCard: SeasonCard,
	SeasonLink: SeasonLink,
}

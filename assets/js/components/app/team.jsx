import {Link} from 'react-router-dom';
import { Jumbotron, Card, CardBlock, CardTitle, CardSubtitle, CardText } from 'reactstrap';
import seasonUrls from 'main/app/player/season/urls';
import teamUrls from 'main/app/player/team/urls';
import leagueUrls from 'main/app/player/league/urls';
import matchUrls from 'main/app/player/match/urls';

const TeamCard = (props) => {
    let team = props.team;
    let league = props.league;
    let season = props.season;
    let matchComp = null;

    if (team.matches.length > 0) {
        let match = team.matches[0];
        
        matchComp = (
            <span>
                {
                    <Link to={`${matchUrls.index}/${match.id}`}>
                        {match.pretty_name}
                    </Link>
                }
            </span>
        );

    } else {
        matchComp = (
            <span>
                No Matches for this team yet
            </span>
        );
    }

    return (
        <div>
            <Card>
                <CardBlock>
                    <CardTitle><Link to={`${teamUrls.index}/${team.id}`}>{team.name}</Link></CardTitle>
                    <CardSubtitle>{team.sport}</CardSubtitle>
                    <CardText>
                        League: {<Link to={`${leagueUrls.index}/${league.id}`}>{league.name}</Link>}
                        <br/>
                        Season: {<Link to={`${seasonUrls.index}/${season.id}`}>{season.pretty_name}</Link>}
                        <br/>
                        Upcoming Match: {matchComp}
                    </CardText>
                </CardBlock>
            </Card>
        </div>
    );
};

const TeamLink = (props) => {
	return (
		<Link to={`${teamUrls.index}/${props.id}`}>
			{props.text}
		</Link>
	);
};

module.exports = {
	TeamCard: TeamCard,
	TeamLink: TeamLink,
}

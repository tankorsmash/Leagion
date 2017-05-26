import {Link} from 'react-router-dom';
import { Jumbotron, Card, CardBlock, CardTitle, CardSubtitle, CardText } from 'reactstrap';
import seasonUrls from 'main/app/player/season/urls';
import teamUrls from 'main/app/player/team/urls';
import leagueUrls from 'main/app/player/league/urls';
import matchUrls from 'main/app/player/match/urls';

import {LeagueLink} from 'components/app/league';
import {SeasonLink} from 'components/app/season';

const TeamLink = (props) => {
	return (
		<Link to={`${teamUrls.index}/${props.id}`}>
			{props.text}
		</Link>
	);
};

const TeamListLink = (props) => {
	return (
		<Link to={`${teamUrls.index}`}>
			{props.text}
		</Link>
	);
};


const TeamCard = (props) => {
    let team = props.team;
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
                    <CardTitle>
                        <TeamLink id={team.id} text={team.name}/>
                    </CardTitle>
                    <CardSubtitle>{team.sport}</CardSubtitle>
                    <CardText>
                        League: <LeagueLink id={team.season.league.id} text={team.season.league.name}/>
                        <br/>
                        Season {team.season.pretty_date}: <SeasonLink id={team.season.id} text="View Schedule"/>
                        <br/>
                        Upcoming Match: {matchComp}
                    </CardText>
                </CardBlock>
            </Card>
        </div>
    );
};

module.exports = {
	TeamCard: TeamCard,
	TeamLink: TeamLink,
	TeamListLink: TeamListLink,
}

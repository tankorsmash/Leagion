import {Link} from 'react-router-dom';
import teamUrls from 'main/app/player/team/urls';
import matchUrls from 'main/app/player/match/urls';
import {Ribbon} from 'components/misc';
import {FullRosterTable} from 'components/app/roster';

import {LeagueLink} from 'components/app/league';
import {SeasonLink} from 'components/app/season';

export const TeamLink = (props) => {
	return (
		<Link to={`${teamUrls.index}/${props.id}`}>
			{props.text}
		</Link>
	);
};

export const TeamListLink = (props) => {
	return (
		<Link to={`${teamUrls.index}`}>
			{props.text}
		</Link>
	);
};


export const TeamCard = (props) => {
    const team = props.team;
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
        <div className="team-card">
            <div className="team-card-top">
                <div>
                <div className="team-logo is-small"> </div>
                </div>
                <div className="h4 team-title">
                    <TeamLink id={team.id} text="Stephen Valleys Apron Joint"/>
                </div>
            </div>
            <div className="team-card-bottom">
                <div className="h5">
                    <LeagueLink id={team.season.league.id} text={team.season.league.name}/>
                </div>
                <div className="h5">
                    <SeasonLink id={team.season.id} text={team.season.pretty_date}/>
                </div>
                <div className="p pt-2">upcoming match:</div>
                <div className="small">{matchComp}</div>
            </div>
        </div>
    );
};

export const TeamMatchCard = (props) => {
	const {title, user, rosterId, teamLogo, teamName, score} = props;

    return (
        <div className="team-match-card">
            <h3 className="team-match-card-title font-weight-bold">
                Home Team
            </h3>
            <div className="team-logo is-medium"> </div>
            <h3>Astronauts</h3>
            <h2>6</h2>
            <FullRosterTable
                user={user}
                rosterId={rosterId}
            />
        </div>
    );
};

export const TeamTitle = (props) => {
    const team = props.team;

    return (
        <div className="team-box-wrapper">
            <div className="team-box">
                <div className="team-box-main">
                    <div className="team-logo is-medium"> </div>
                    <div className="h3 team-title">
                        {team.name}
                    </div>
                </div>
            </div>
            <Ribbon
                leftEl={<LeagueLink id={team.season.league.id} text={team.season.league.name}/>}
                rightEl={<SeasonLink id={team.season.id} text={team.season.pretty_date}/>}
            />
        </div>
    );
};

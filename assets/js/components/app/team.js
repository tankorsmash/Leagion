import {Link} from 'react-router-dom';
import {Table} from 'reactstrap';
import teamUrls from 'main/app/player/team/urls';
import matchUrls from 'main/app/player/match/urls';
import {Ribbon} from 'components/misc';
import {FullRosterTable} from 'components/app/roster';

import {LeagueLink} from 'components/app/league';
import {SeasonLink} from 'components/app/season';

import {MatchScoreSetter} from 'components/app/match';

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
    const {
        title, user, rosterId, teamLogo, teamName, score,
        completed, teamId, home_team, away_team, matchId, updateScore
    } = props;

    let scoreEl;

    if (completed) {
        scoreEl = <h2>{score}</h2>;
    } else {
        scoreEl = (
            <span>
                <h2>N/A</h2>
                {user.captain_of_teams.includes(teamId) &&
                    <MatchScoreSetter
                        home_team={home_team}
                        away_team={away_team}
                        matchId={matchId}
                        updateScore={updateScore}
                    />
                }
            </span>
        );
    }

    return (
        <div className="team-match-card le-card">
            <h3 className="team-match-card-title font-weight-bold">
                {title}
            </h3>
            <div className="team-logo is-medium"> </div>
            <h3>{teamName}</h3>
            {scoreEl}
            <FullRosterTable
                user={user}
                rosterId={rosterId}
            />
        </div>
    );
};

export const TeamMatchCardMobile = (props) => {
    const {
        user, teamLogo, score, team, completed,
        home_team, away_team, matchId, updateScore,
        noTopBorder
    } = props;

    let style = {};
    if (noTopBorder) {
        style.borderTop = 'none';
    }

    return (
        <div className="team-match-card-mobile le-card" style={style}>
            <div className="team-logo is-medium"> </div>
            <span className="team-name">
                <h4>{team.name}</h4>
                {!completed && user.captain_of_teams.includes(team.id) &&
                    <MatchScoreSetter
                        home_team={home_team}
                        away_team={away_team}
                        matchId={matchId}
                        updateScore={updateScore}
                    />
                }
            </span>
            <h2>{completed ? score : "N/A"}</h2>
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


export const TeamRankTable = (props) => {
    const teams = props.teams.sort((teamA, teamB) => {
        return teamA.win_draw_loss_points.points < teamB.win_draw_loss_points.points;
    });

	return (
		<Table responsive className="leagion-table">
			<thead>
				<tr>
					<th>Rank</th>
					<th>Team Name</th>
					<th>Wins</th>
					<th>Ties</th>
					<th>Losses</th>
					<th>Points</th>
				</tr>
			</thead>
			<tbody>
				{teams.map((team, i) => {
					return (
						<tr key={i}>
							<td>#{i + 1}</td>
							<td><TeamLink id={team.id} text={team.name}/></td>
							<td>{team.win_draw_loss_points.wins}</td>
							<td>{team.win_draw_loss_points.draws}</td>
							<td>{team.win_draw_loss_points.losses}</td>
							<td>{team.win_draw_loss_points.points}</td>
						</tr>
					);
				})}
			</tbody>
		</Table>
	);
};

import {Button, Media} from 'reactstrap';
import { SketchPicker } from 'react-color';
import Dropzone from 'react-dropzone';
import { Table } from 'components/tables';

import ajax from 'common/ajax';
import auth from 'main/auth';
import urls from 'main/app/player/urls';
import {Link} from 'components/buttons';

import {Ribbon} from 'components/misc';
import DatasetView from 'components/dataset_view';

import {FullRosterTable} from 'components/app/roster';

import {MatchScoreSetter} from 'components/app/match';

export const TeamCard = (props) => {
    const team = props.team;
    let matchComp = null;
    if (team.matches.length > 0) {
        let match = team.matches[0];

        matchComp = (
            <span>
                {
                    <Link
                        url={urls.matchDetail}
                        args={{
                            leagueId: team.season.league.id,
                            seasonId: team.season.id,
                            matchId: match.id
                        }}
                    >
                        {team.season.pretty_date}
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
                    <Link
                        url={urls.teamDetail}
                        args={{
                            leagueId: team.season.league.id,
                            seasonId: team.season.id,
                            teamId: team.id,
                        }}
                    >
                        {team.name}
                    </Link>
                </div>
            </div>
            <div className="team-card-bottom">
                <div className="h5">
                    <Link
                        url={urls.leagueDetail}
                        args={{leagueId: team.season.league.id}}
                    >
                        {team.season.league.name}
                    </Link>
                </div>
                <div className="h5">
                    <Link
                        url={urls.seasonDetail}
                        args={{
                            leagueId: team.season.league.id,
                            seasonId: team.season.id
                        }}
                    >
                        {team.season.pretty_date}
                    </Link>
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
                leftEl={
                    <Link
                        url={urls.leagueDetail}
                        args={{leagueId: team.season.league.id}}
                    >
                        {team.season.league.name}
                    </Link>
                }
                rightEl={
                    <Link
                        url={urls.seasonDetail}
                        args={{
                            leagueId: team.season.league.id,
                            seasonId: team.season.id,
                        }}
                    >
                        {team.season.pretty_date}
                    </Link>
                }
            />
        </div>
    );
};


export const TeamRankTable = (props) => {
    const {leagueId, seasonId} = props;
    const teams = props.teams.sort((teamA, teamB) => {
        return teamA.win_draw_loss_points.points < teamB.win_draw_loss_points.points;
    });

	return (
        <Table responsive striped
            data={teams}
            columns={[
                {header: 'Rank', cell: (team, i) => i + 1},
                {header: 'Team Name', cell: (team) => (
                    <Link
                        url={urls.teamDetail}
                        args={{
                            leagueId: leagueId,
                            seasonId: seasonId,
                            teamId: team.id,
                        }}
                    >
                        {team.name}
                    </Link>)
                },
                {header: 'Wins', cell: (team) => team.win_draw_loss_points.wins},
                {header: 'Ties', cell: (team) => team.win_draw_loss_points.draws},
                {header: 'Losses', cell: (team) => team.win_draw_loss_points.losses},
                {header: 'Points', cell: (team) => team.win_draw_loss_points.points},
            ]}
        />
	);
};

class TeamLogoView extends React.Component {
    render() {
        return (
            <div>
                <Media>
                    <Media
                        width="200px"
                        className=""
                        object
                        src={this.props.teamLogo}
                    />
                </Media>
            </div>
        );
    }
};

class TeamLogoEdit extends React.Component {
    render() {
        const newLogoPrepared = this.props.files.length > 0;

        return (
            <div>
                <Dropzone onDrop={this.props.onDrop}>
                    <div>
                        { !newLogoPrepared && <span className="text-center">
                            Click or drag in new team logo
                        </span> }

                        { this.props.files.map((f) => {
                            return (
                                <Media key={f.name}>
                                    <Media className="w-100" object src={f.preview} />
                                </Media>
                            );
                        })}
                    </div>
                </Dropzone>
                { newLogoPrepared &&
                        <Button className="mt-1" onClick={this.props.upload} >
                            Confirm
                        </Button>
                }
            </div>
        );
    }
};


class TeamLogo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            viewOrEdit: VIEW_MODE,
            teamLogo: this.props.team.logo,
            files: []
        };
    }

    toggleViewEdit = (e) => {
        this.setState({
            viewOrEdit: (this.state.viewOrEdit == VIEW_MODE) ? EDIT_MODE : VIEW_MODE,
        });
    }

    userIsCaptain = () => {
        let {team, user} = this.props;
        const isCaptain = ( auth.moderatorOrBetter(user) || team.captains.includes(user.id) );
        return isCaptain;
    };

    onDrop = (files) => {
        console.log("ondrop files:", files);
        this.setState({
            files
        });
    }

    upload = (e) => {
        let data  = new FormData();

        let f = this.state.files[0];
        data.append('logo', f)

        let url = reverse("api-team-detail", {team_id: this.props.team.id});
        ajax({
            url:url,
            data:data,
            method:"PATCH",
            stringifyData: false,
            headers: {},
        }).then(response => {
            toastr.success("Successfully updated team logo!");
        }).catch(response => {
            toastr.error("Unknown error occurred updating team logo!");
        });
        this.setState({
            teamLogo: f.preview,
        });
    }



    render() {
        let {team, user} = this.props;
        const isCaptain = this.userIsCaptain();

        const viewMode = this.state.viewOrEdit;
        const inViewMode = viewMode == VIEW_MODE;
        const inEditMode = viewMode == EDIT_MODE;

        return (
            <div>
                <h3> Logo </h3>
                { isCaptain && <Button onClick={this.toggleViewEdit}>
                    { inViewMode && "Edit" }
                    { inEditMode && "View" }
                </Button> }

                <div className="pt-1">
                    { inViewMode && <TeamLogoView teamLogo={this.state.teamLogo} />}
                    { isCaptain && inEditMode && <TeamLogoEdit onChangeComplete={this.onChangeComplete} files={this.state.files} upload={this.upload} onDrop={this.onDrop} teamLogo={this.state.teamLogo} />}
                </div>
            </div>
        );
    }
};

class TeamColorView extends React.Component {
    render() {
        let {teamColor} = this.props;

        const style = {
            backgroundColor: `#${teamColor}`,
            width: "128px",
            height: "128px",
        };
        return (
            <div>
                <div className="text-hide" style={style}>
                    Color #{teamColor}
                </div>
            </div>
        );
    }
};

class TeamColorEdit extends React.Component {
    render() {
        let {teamColor} = this.props;
        return (
            <div>
                <SketchPicker
                    disableAlpha={true}
                    onChangeComplete={this.props.onChangeComplete}
                    color={teamColor} />
            </div>
        );
    }
};

const VIEW_MODE = "view";
const EDIT_MODE = "edit";

class TeamColor extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            viewOrEdit: VIEW_MODE,
            teamColor: this.props.team.color,
        };
    }

    toggleViewEdit = (e) => {
        this.setState({
            viewOrEdit: (this.state.viewOrEdit == VIEW_MODE) ? EDIT_MODE : VIEW_MODE,
        });
    }

    //happens when user finalizes the color picked
    onChangeComplete = (color, event) => {
        color = color.hex.replace(/#/g, '');
        this.setState({
            teamColor: color
        });

        ajax({
            url: reverse('api-team-detail', {team_id: this.props.team.id}),
            data: {color: color},
            method: 'PATCH',
        }).then(data => {
            toastr.success('Updated team color!');
        });
    }

    userIsCaptain = () => {
        let {team, user} = this.props;
        const isCaptain = ( auth.moderatorOrBetter(user) || team.captains.includes(user.id) );
        return isCaptain;
    };

    render() {
        let {team} = this.props;
        const isCaptain = this.userIsCaptain();

        const viewMode = this.state.viewOrEdit;
        const inViewMode = viewMode == VIEW_MODE;
        const inEditMode = viewMode == EDIT_MODE;

        return (
            <div>
                <h3> Color </h3>

                { isCaptain && <Button onClick={this.toggleViewEdit}>
                    { inViewMode && "Edit" }
                    { inEditMode && "View" }
                </Button> }

                <div className="pt-1">
                    { inViewMode && <TeamColorView teamColor={this.state.teamColor} />}
                    { isCaptain && inEditMode && <TeamColorEdit onChangeComplete={this.onChangeComplete} teamColor={this.state.teamColor} />}
                </div>
            </div>
        );
    }
};

export class TeamInfoTab extends DatasetView {
    get datasetStateAttr() {
        return "user";
    }

    get datasetViewName() {
        return "api-my-details";
    }

    render() {
        if (this.getIsLoaded() == false) {
            return ( "Loading..." );
        };

        const user = this.state.user;
        const team = this.props.team;
        return (
            <div>
                <TeamLogo team={team} user={user} />
                <hr/>
                <TeamColor team={team} user={user} />
            </div>
        );
    };
};

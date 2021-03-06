import SpinLoader from 'components/spinloader';
import {Row, Col} from 'reactstrap';
import MediaQuery from 'react-responsive';
import TeamMatchCard from 'main/app/player/league/season/match/TeamMatchCard';
import TeamMatchCardMobile from 'main/app/player/league/season/match/TeamMatchCardMobile';
import FullRosterTable from 'main/app/player/league/season/match/FullRosterTable';

import {Titlebar} from 'components/misc';
import ajax from 'common/ajax';
import update from 'immutability-helper';

import {MediaBreakpoints} from 'common/responsive';
import {Tabs} from 'components/tabs';

const MatchDetailMobile = (props) => {
    const {
        away_roster, home_roster, home_team, away_team,
        home_points, away_points, completed
    } = props.match;

    return (
        <div className="team-match-mobile">
            <TeamMatchCardMobile
                team={home_team}
                score={home_points}
                user={props.user}
                completed={completed}
                home_team={home_team}
                away_team={away_team}
                matchId={props.match.id}
                updateScore={props.updateScore}
            />
            <TeamMatchCardMobile
                team={away_team}
                score={away_points}
                user={props.user}
                completed={completed}
                home_team={home_team}
                away_team={away_team}
                matchId={props.match.id}
                updateScore={props.updateScore}
                noTopBorder={true}
            />
            <Tabs
                className="team-match-roster-table-mobile"
                tabs={[{
                    label: 'Home Roster',
                    content: <FullRosterTable user={props.user} rosterId={home_roster}/>
                }, {
                    label: 'Away Roster',
                    content: <FullRosterTable user={props.user} rosterId={away_roster}/>
                }]}
            />
        </div>
    );
};

const MatchDetailDesktop = (props) => {
    const {
        away_roster, home_roster, home_team, away_team,
        home_points, away_points, completed
    } = props.match;

    return (
        <div>
            <Row>
                <Col md="5" className="d-flex justify-content-end">
                    <TeamMatchCard
                        title="Home Team"
                        team={home_team}
                        score={home_points}
                        user={props.user}
                        rosterId={home_roster}
                        completed={completed}
                        home_team={home_team}
                        away_team={away_team}
                        matchId={props.match.id}
                        updateScore={props.updateScore}
                    />
                </Col>
                <Col md="2" className="team-match-vs">
                    <h2>Vs.</h2>
                </Col>
                <Col md="5" className="team-match-column">
                    <TeamMatchCard
                        title="Away Team"
                        team={away_team}
                        score={away_points}
                        user={props.user}
                        rosterId={away_roster}
                        completed={completed}
                        home_team={home_team}
                        away_team={away_team}
                        matchId={props.match.id}
                        updateScore={props.updateScore}
                    />
                </Col>
            </Row>
        </div>
    );
};

export default class MatchDetail extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            match: {}, loaded: false };
    }

    componentDidMount() {
        ajax({
            url: reverse('api-my-match-detail', {match_id: this.props.match.params.matchId}),
        }).then(data => {
            this.setState({
                match: data,
                loaded: true
            });
        });
    }

    updateScore = (newScores) => {
        const match = update(this.state.match, {
            home_points: {$set: newScores.home_points},
            away_points: {$set: newScores.away_points},
            completed: {$set: true},
        });

        this.setState({
            match: match,
        });
    };

    render() {
        return (
            <div>
                <Titlebar title="Match" />
                <SpinLoader loaded={this.state.loaded}>
                    {this.state.loaded &&
                        <div>
                            <Row>
                                <Col className="text-center mt-3 mx-auto" md={{size:6}}>
                                    <h3> {this.state.match.pretty_date} </h3>
                                    <h3> {'@ ' + this.state.match.pretty_time} </h3>
                                </Col>
                            </Row>
                            <MediaQuery maxWidth={MediaBreakpoints.L}>
                                <MatchDetailMobile
                                    match={this.state.match}
                                    updateScore={this.updateScore}
                                    user={this.props.user}
                                />
                            </MediaQuery>
                            <MediaQuery minWidth={MediaBreakpoints.L}>
                                <MatchDetailDesktop
                                    match={this.state.match}
                                    updateScore={this.updateScore}
                                    user={this.props.user}
                                />
                            </MediaQuery>
                        </div>
                    }
                </SpinLoader>
            </div>
        );
    }
}

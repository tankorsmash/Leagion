import {Switch} from 'react-router-dom';
import {Route} from 'components/router';
import SpinLoader from 'components/spinloader';
import {Row, Col} from 'reactstrap';

import matchUrls from 'main/app/player/match/urls';
import {TeamMatchCard} from 'components/app/team';
import {FourOhFour} from 'components/error-pages';

import Titlebar from 'components/app/titlebar';
import ajax from 'common/ajax';
import update from 'immutability-helper';

class MatchDetail extends React.Component {
    constructor(props) {
        super(props);

        this.state = { 
            match: {}, loaded: false };
    }

    componentDidMount() {
        ajax({
            url: reverse('api-match-detail', {match_id: this.props.match.params.matchId}),
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
        const {
            away_roster, home_roster, home_team, away_team,
            home_points, away_points, pretty_date, pretty_time,
            completed
        } = this.state.match;

        return (
            <SpinLoader loaded={this.state.loaded}>
                {this.state.loaded &&
                    <div>
                        <Titlebar title="Match" />
                        <div>
                            <Row>
                                <Col className="text-center mt-3" md={{size:6, offset:3}}>
                                    <h3> {pretty_date} </h3>
                                    <h3> {'@ ' + pretty_time} </h3>
                                </Col>
                            </Row>
                            <Row>
                                <Col md="5" className="d-flex justify-content-end">
                                    <TeamMatchCard
                                        title="Home Team"
                                        teamName={home_team.name}
                                        teamId={home_team.id}
                                        score={home_points}
                                        user={this.props.user}
                                        rosterId={home_roster}
                                        completed={completed}
                                        home_team={home_team}
                                        away_team={away_team}
                                        matchId={this.state.match.id}
                                        updateScore={this.updateScore}
                                    />
                                </Col>
                                <Col md="2" className="team-match-vs">
                                    <h2>Vs.</h2>
                                </Col>
                                <Col md="5" className="team-match-column">
                                    <TeamMatchCard
                                        title="Away Team"
                                        teamName={away_team.name}
                                        teamId={away_team.id}
                                        score={away_points}
                                        user={this.props.user}
                                        rosterId={away_roster}
                                        completed={completed}
                                        home_team={home_team}
                                        away_team={away_team}
                                        matchId={this.state.match.id}
                                        updateScore={this.updateScore}
                                    />
                                </Col>
                            </Row>
                        </div>
                    </div>
                }
            </SpinLoader>
        );
    }
}

export class Match extends React.Component {
	//<Route exact path={teamUrls.index} component={TeamList} />

    render() {
        return (
            <Switch>
                <Route exact path={matchUrls.detail} user={this.props.user} component={MatchDetail} />
                <Route component={FourOhFour} />
            </Switch>
        );
    }
}

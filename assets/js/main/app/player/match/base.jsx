import {Switch, Link} from 'react-router-dom';
import {Route} from 'components/router';
import SpinLoader from 'components/spinloader';
import {Row, Col} from 'reactstrap';

import matchUrls from 'main/app/player/match/urls';
import {MatchCard, BattingOrderTable} from 'components/app/match';
import {FourOhFour} from 'components/error-pages';

import ajax from 'common/ajax';

class MatchDetail extends React.Component {
    constructor(props) {
        super(props);

        this.state = { 
            match: {}, loaded: false }; };

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

    render() {
        let match = this.state.match;
        let away_team = match.away_team || {};
        let home_team = match.home_team || {};
        let away_roster = match.away_roster || {};
        let home_roster = match.home_roster || {};
		console.log(this.state.match);
        return (
            <SpinLoader loaded={this.state.loaded}>
                <div>
                    <Row>
                        <Col md={{size:6, offset:3}}>
                            <MatchCard match={match}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="6">
                            Home Roster
                            <BattingOrderTable batters={home_roster.players}/>
                        </Col>
                        <Col md="6">
                            Away Roster
                            <BattingOrderTable batters={away_roster.players}/>
                        </Col>
                    </Row>
                </div>
            </SpinLoader>
        );
    }
}

class Match extends React.Component {
	//<Route exact path={teamUrls.index} component={TeamList} />

    render() {
        return (
            <Switch>
                <Route exact path={matchUrls.detail} component={MatchDetail} />
                <Route component={FourOhFour} />
            </Switch>
        );
    }
}

module.exports = {
    Match: Match,
};



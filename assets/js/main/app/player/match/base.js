import {Switch} from 'react-router-dom';
import {Route} from 'components/router';
import SpinLoader from 'components/spinloader';
import {Row, Col} from 'reactstrap';

import matchUrls from 'main/app/player/match/urls';
import {MatchCard, FullRosterTable} from 'components/app/match';
import {FourOhFour} from 'components/error-pages';

import ajax from 'common/ajax';

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

    render() {
        const match = this.state.match;
        const {away_roster, home_roster} = match;

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
                            <FullRosterTable rosterId={home_roster}/>
                        </Col>
                        <Col md="6">
                            Away Roster
                            <FullRosterTable rosterId={away_roster}/>
                        </Col>
                    </Row>
                </div>
            </SpinLoader>
        );
    }
}

export class Match extends React.Component {
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

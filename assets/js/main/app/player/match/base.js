import {Switch} from 'react-router-dom';
import {Route} from 'components/router';
import SpinLoader from 'components/spinloader';
import {Row, Col} from 'reactstrap';

import matchUrls from 'main/app/player/match/urls';
import {MatchCard, FullRosterTable} from 'components/app/match';
import {FourOhFour} from 'components/error-pages';

import Titlebar from 'components/app/titlebar';
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
                    <Titlebar title="Match" />
                    <div>
                        <Row>
                            <Col className="text-center mt-3" md={{size:6, offset:3}}>
                                <h3> {match.pretty_date} </h3>
                                <h3> {'@ ' + match.pretty_time} </h3>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="6">
                                Home Roster
                                <FullRosterTable
                                    user={this.props.user}
                                    rosterId={home_roster}
                                />
                            </Col>
                            <Col md="6">
                                Away Roster
                                <FullRosterTable
                                    user={this.props.user}
                                    rosterId={away_roster}
                                />
                            </Col>
                        </Row>
                    </div>
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
                <Route exact path={matchUrls.detail} user={this.props.user} component={MatchDetail} />
                <Route component={FourOhFour} />
            </Switch>
        );
    }
}

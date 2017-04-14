import {Switch, Link} from 'react-router-dom';
import {Route} from 'components/router';
import SpinLoader from 'components/spinloader';
import {Row, Col} from 'reactstrap';

import matchUrls from 'main/app/player/match/urls';

import {FourOhFour} from 'components/error-pages';

import ajax from 'common/ajax';

class MatchDetail extends React.Component {
    constructor(props) {
        super(props);

        this.state = { 
            match: {},
            loaded: false
        }; };

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
		console.log(this.state.match);
        return (
            <SpinLoader loaded={this.state.loaded}>
                <Row>
                    <Col md="6">
                    </Col>
                    <Col md="6">
                    </Col>
                </Row>
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



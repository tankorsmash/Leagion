import {Switch, Link} from 'react-router-dom';
import {Route} from 'components/router';
import SpinLoader from 'components/spinloader';
import {Row, Col} from 'reactstrap';

import playerUrls from 'main/app/player/urls';
import teamUrls from 'main/app/player/team/urls';

import {MatchList} from 'components/app/match';
import {TeamPlayerTable} from 'components/app/player';

import {FourOhFour} from 'components/error-pages';

import ajax from 'common/ajax';

class TeamDetail extends React.Component {
    constructor(props) {
        super(props);

        this.state = { 
            team: {},
            loaded: false
        };
    };

    componentWillReceiveProps() {
        ajax({
            url: reverse('api-team-detail', {team_id: this.props.match.params.teamId}),
        }).then(data => {
            this.setState({
                team: data,
                loaded: true
            });
        });
    }

    render() {
        return (
            <SpinLoader loaded={this.state.loaded}>
                <Row>
                    <Col md="6">
                        <TeamPlayerTable players={this.state.team.players} />
                    </Col>
                    <Col md="6">
                        <MatchList matches={this.state.team.matches} />
                    </Col>
                </Row>
            </SpinLoader>
        );
    }
}

class Team extends React.Component {

    //<Route exact path={teamUrls.index} component={TeamList} />
    render() {
        return (
            <Switch>
                <Route path={teamUrls.detail} component={TeamDetail} />
                <Route component={FourOhFour} />
            </Switch>
        );
    }
}

module.exports = {
    Team: Team,
};


import {Switch, Link} from 'react-router-dom';
import {Route} from 'components/router';
import {AsyncBase} from 'components/base';
import SpinLoader from 'components/spinloader';
import {MatchTable} from 'components/app/match';

import {Row, Col} from 'reactstrap';

import seasonUrls from 'main/app/player/season/urls';

import {FourOhFour} from 'components/error-pages';

import ajax from 'common/ajax';

class SeasonSchedule extends React.Component {
    constructor(props) {
        super(props);

        this.state = { 
            season: {},
            loaded: false
        };
    };

    componentDidMount() {
        ajax({
            url: reverse('api-my-season-detail', {season_id: this.props.match.params.seasonId}),
        }).then(data => {
            this.setState({
                season: data,
                loaded: true
            });
        });
    }

    render() {
        return (
            <SpinLoader loaded={this.state.loaded}>
                <Row>
                    <h5>{this.state.season.pretty_name}</h5>
                    <MatchTable matches={this.state.season.matches}/>
                </Row>
            </SpinLoader>
        );
    }
}


class Season extends React.Component {

    render() {
        return (
            <Switch>
                <Route exact path={seasonUrls.detail} component={SeasonSchedule} />
                <Route component={FourOhFour} />
            </Switch>
        );
    }
}

module.exports = {
    Season: Season,
};


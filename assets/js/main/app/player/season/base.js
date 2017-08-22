import {Switch} from 'react-router-dom';
import {Route} from 'components/router';
import SpinLoader from 'components/spinloader';
import {MatchTable} from 'components/app/match';
import {TeamRankTable} from 'components/app/team';

import seasonUrls from 'main/app/player/season/urls';
import Titlebar from 'components/app/titlebar';

import {FourOhFour} from 'components/error-pages';
import Tabs from 'components/tabs';

import ajax from 'common/ajax';

class SeasonSchedule extends React.Component {
    constructor(props) {
        super(props);

        this.state = { 
            season: {},
            loaded: false
        };
    }

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
            <div>
                <Titlebar title="Season" />
                <SpinLoader loaded={this.state.loaded}>
                    {this.state.loaded &&
                        <div className="content">
                            <div className="text-center">
                                <h3>{this.state.season.pretty_name}</h3>
                            </div>
                            <Tabs
                                className="team-match-table"
                                tabs={[{
                                    label: 'Schedule',
                                    content: (<MatchTable matches={this.state.season.matches} />)
                                }, {
                                    label: 'Rankings',
                                    content: (<TeamRankTable teams={this.state.season.teams} />)
                                }]}
                            />
                        </div>
                    }
                </SpinLoader>
            </div>
        );
    }
}


export class Season extends React.Component {

    render() {
        return (
            <Switch>
                <Route exact path={seasonUrls.detail} component={SeasonSchedule} />
                <Route component={FourOhFour} />
            </Switch>
        );
    }
}

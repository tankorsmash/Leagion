import {Switch} from 'react-router-dom';
import {Route} from 'components/router';
import SpinLoader from 'components/spinloader';
import {MatchTable} from 'components/app/match';
import {TeamRankTable} from 'components/app/team';

import seasonUrls from 'main/app/player/season/urls';
import {Titlebar} from 'components/text';

import {FourOhFour} from 'components/error-pages';
import {RoutedTabs} from 'components/tabs';

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
                            <RoutedTabs
                                className="team-match-table"
                                tabs={[{
                                    label: 'Schedule',
                                    id: 'schedule',
                                    content: <MatchTable matches={this.state.season.matches} />
                                }, {
                                    label: 'Rankings',
                                    id: 'rankings',
                                    content: <TeamRankTable teams={this.state.season.teams} />
                                }]}
                                basePath={seasonUrls.detail}
                                pathParams={{seasonId: this.props.match.params.seasonId}}
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
                <Route path={seasonUrls.detail} component={SeasonSchedule} />
                <Route component={FourOhFour} />
            </Switch>
        );
    }
}

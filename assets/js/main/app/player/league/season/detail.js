import SpinLoader from 'components/spinloader';
import {MatchTable} from 'components/app/match';
import {TeamRankTable} from 'components/app/team';

import {Titlebar} from 'components/text';
import {Tabs} from 'components/tabs';

import ajax from 'common/ajax';

export default class SeasonDetail extends React.Component {
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
                                    content: (<MatchTable
                                        matches={this.state.season.matches}
                                        seasonId={this.state.season.id}
                                        leagueId={this.state.season.league_id}
                                    />)
                                }, {
                                    label: 'Rankings',
                                    content: <TeamRankTable
                                        teams={this.state.season.teams}
                                        seasonId={this.state.season.id}
                                        leagueId={this.state.season.league_id}
                                    />
                                }]}
                            />
                        </div>
                    }
                </SpinLoader>
            </div>
        );
    }
}

import SpinLoader from 'components/spinloader';
import {Link} from 'components/buttons';
import {Titlebar} from 'components/misc';
import ajax from 'common/ajax';
import urls from 'main/app/player/urls';

export default class LeagueDetail extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            leagues: [],
            loaded: false
        };
    }

    componentDidMount() {
        ajax({
            url: reverse('api-my-league-detail', {league_id: this.props.match.params.leagueId}),
        }).then(data => {
            this.setState({
                league: data,
                loaded: true
            });
        });
    }

    render() {
        return (
            <div>
                <Titlebar title="League" />
                <SpinLoader loaded={this.state.loaded}>
                    {this.state.loaded &&
                        <div className="text-center content">
                            <h3>{this.state.league.name}</h3>
                            {this.state.league.my_seasons.map((season, i) => {
                                return (
                                    <Link
                                        key={i}
                                        url={urls.seasonDetail}
                                        args={{
                                            leagueId: season.league.id,
                                            seasonId: season.id
                                        }}
                                    >
                                        <h4>{season.pretty_date}</h4>
                                    </Link>
                                );
                            })}
                        </div>
                    }
                </SpinLoader>
            </div>
        );
    }
}

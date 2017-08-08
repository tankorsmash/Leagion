import {Switch} from 'react-router-dom';
import {Route} from 'components/router';
import SpinLoader from 'components/spinloader';

import leagueUrls from 'main/app/player/league/urls';
import {SeasonLink} from 'components/app/season';

import Titlebar from 'components/app/titlebar';
import {FourOhFour} from 'components/error-pages';

import ajax from 'common/ajax';

export class LeagueDetail extends React.Component {
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
                                return <SeasonLink key={i} id={season.id} text={<h4>{season.pretty_date}</h4>}/>;
                            })}
                        </div>
                    }
                </SpinLoader>
            </div>
        );
    }
}

export class League extends React.Component {

    render() {
        return (
            <Switch>
                <Route exact path={leagueUrls.detail} component={LeagueDetail} />
                <Route component={FourOhFour} />
            </Switch>
        );
    }
}

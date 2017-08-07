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

export class PlayerProfile extends React.Component {
    constructor(props) {
        super(props);

        this.state = { 
            player: {},
            loaded: false
        };
    }

    componentDidMount() {
        ajax({
            url: reverse('api-my-public-player-detail', {player_id: this.props.match.params.playerId}),
        }).then(data => {
            this.setState({
                player: data,
                loaded: true
            });
        });
    }

    render() {
        console.log(this.props.match);
        return (
            <div>
                <Titlebar title="Player Profile" />
                <SpinLoader loaded={this.state.loaded}>
                    {this.state.loaded &&
                        <div>
                            <div className="text-center">
                                {this.state.player.full_name}
                            </div>
                        </div>
                    }
                </SpinLoader>
            </div>
        );
    }
}

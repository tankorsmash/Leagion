import SpinLoader from 'components/spinloader';
import {Titlebar} from 'components/text';
import ajax from 'common/ajax';
import {PlayerAvatar} from 'components/app/player';
import {StaticRow} from 'components/forms';


export default class PlayerProfileRouter extends React.Component {
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
        const player = this.state.player;

        return (
            <div>
                <Titlebar title="Player Profile" />
                <SpinLoader loaded={this.state.loaded}>
                    {this.state.loaded &&
                        <div className="content public-profile mx-auto">
                            <PlayerAvatar
                                size={250}
                                email={player.email}
                            >
                                <h3>{this.state.player.full_name}</h3>
                            </PlayerAvatar>
                            <StaticRow label="Email:" value={player.email} />
                            <StaticRow label="Phone number:" value={player.default_phonenumber} />
                            <StaticRow label="Alt Phone number:" value={player.alt_phonenumber} />
                        </div>
                    }
                </SpinLoader>
            </div>
        );
    }
}

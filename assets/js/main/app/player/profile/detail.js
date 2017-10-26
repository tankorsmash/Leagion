import SpinLoader from 'components/spinloader';
import {Titlebar} from 'components/text';
import ajax from 'common/ajax';
import {StaticRow} from 'components/forms';
import {Avatar} from 'components/media';


export default class PlayerProfileDetail extends React.Component {
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
                            <div className="player-avatar">
                                <Avatar
                                    className="player-avatar-pic"
                                    size="md"
                                    src={player.avatar_url}
                                />
                                <div>
                                    {player.full_name}
                                </div>
                            </div>
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

//going to be used elsewhere than just PlayerDetail, like in Rosters and Teams,
// so we need to keep this Component as simple as possible
class SimplePlayer extends React.Component {
    render() {
        let player = this.props.player;
        return (
            <div>
                <div>
                    { player.full_name }
                </div>
            </div>
        );
    }
}

//expand on this one for player details-specific logic
class Player extends SimplePlayer {

}


module.exports = {
    SimplePlayer: SimplePlayer
};

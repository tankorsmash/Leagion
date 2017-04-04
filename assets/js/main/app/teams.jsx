import ajax from 'common/ajax';
var Spinner = require('react-spinkit');

import {SimplePlayer} from 'main/app/players';

const NOT_LOADED = -905639.6421;

class Team extends React.Component {
    render() {
        let team = this.props.team;
        return (
            <div>
                Team name: { team.name }

                <div className="pl-sm-3">
                    { team.players.map(player => {
                        return <SimplePlayer
                            player={player}
                            key={player.id}
                        />
                    }) }
                </div>
            </div>
        );
    }
}


class Teams extends React.Component {
    constructor(props){
        super(props);
        this.state = { teams: NOT_LOADED };
    }

    componentDidMount() {
        ajax({
            url: reverse('api-team-list'),
        }).then(data => {
            this.setState({teams: data});
        });
    }

    render() {
        let isLoaded = this.state.teams !== NOT_LOADED;

        let content;
        if (isLoaded == false) {
            content = <Spinner spinnerName='three-bounce' />;
        } else {
            content = this.state.teams.map((team)=>{
                return <Team team={team} key={team.id} />
            })
        }

        return <div>{content}</div>;
    }
}

module.exports = Teams;

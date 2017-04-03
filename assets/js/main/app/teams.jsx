import ajax from 'common/ajax';

import {SimplePlayer} from 'main/app/players';

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
        this.state = { teams: [] };
    }

    componentDidMount() {
        ajax({
            url: reverse('api-team-list'),
        }).then(data => {
            this.setState({teams: data});
        });
    }

    render() {
        return (
            <div>
                { this.state.teams.map((team)=>{
                    return <Team
                        team={team}
                        key={team.id}
                    />
                })}
            </div>
        );
    }
}

module.exports = Teams;

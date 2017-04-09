import ajax from 'common/ajax';
var Spinner = require('react-spinkit');

import {SimplePlayer} from 'main/app/admin/components/players';

import {NOT_LOADED} from 'common/constants';

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
        this.updateDataset();
    }

    updateDataset() {
        let url = reverse('api-team-list');

        ajax({
            url: url,
        }).then(data => {
            //if there's only one object, its a single detail team, so arrayify it
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
            });
        }

        return <div>{content}</div>;
    }
}

module.exports = Teams;

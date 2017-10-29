import SpinLoader from 'components/spinloader';
import {Titlebar} from 'components/text';
import ajax from 'common/ajax';

import TeamCard from 'main/app/player/league/season/team/TeamCard';

export default class TeamList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            teams: [],
            loaded: false
        };
    }

    componentDidMount() {
        ajax({
            url: reverse('api-my-team-list'),
        }).then(data => {
            this.setState({
                teams: data,
                loaded: true
            });
        });
    }

    render() {
        return (
            <SpinLoader loaded={this.state.loaded}>
                <Titlebar title="My Teams" />
                <div className="content team-listing">
                    {this.state.teams.map((team, i) => {
                        return (
                            <TeamCard key={i} team={team} />
                        );
                    })}
                </div>
            </SpinLoader>
        );
    }
}

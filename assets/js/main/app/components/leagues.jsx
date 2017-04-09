import {Link} from 'react-router-dom';
import { DropdownItem, DropdownMenu, NavLink, Jumbotron } from 'reactstrap';
import Spinner from 'react-spinkit';

import ajax from 'common/ajax';

import {NOT_LOADED} from 'common/constants';

class LeagueJumbo extends React.Component {
    render() {
        let league = this.props.league;
        return (
            <Jumbotron>
                <Link to={`${leagueUrls.index}/${league.id}`}>{league.name}</Link>
            </Jumbotron>
        );
    }
}


class League extends React.Component {
    render() {
        let league = this.props.league;
        return (
            <div>
                League name: { league.name }
            </div>
        );
    }
}


class Leagues extends React.Component {
    constructor(props){
        super(props);
        this.state = { leagues: NOT_LOADED };
    }

    componentDidMount() {
        let url = reverse('api-league-list');

        ajax({
            url: url,
        }).then(data => {
            //if there's only one object, its a single detail league, so arrayify it
            this.setState({leagues: data});
        });
    }

    render() {
        let isLoaded = this.state.leagues !== NOT_LOADED;

        let content;
        if (isLoaded == false) {
            content = <Spinner spinnerName='three-bounce' />;
        } else {
            content = this.state.leagues.map((league)=>{
                return <League league={league} key={league.id} />
            });
        }

        return <div>{content}</div>;
    }
}

module.exports = Leagues;

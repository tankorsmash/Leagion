import {Link} from 'react-router-dom';
import { DropdownItem, DropdownMenu, NavLink } from 'reactstrap';

import ajax from 'common/ajax';

class LeagueDropdownItem extends React.Component {
    render() {
        return (
            <DropdownItem>
                <NavLink tag={Link} to={this.props.league.url || ''}>
                    {this.props.league.name}
                </NavLink>
            </DropdownItem>
        );
    }
}

class LeaguesDropdownMenu extends React.Component {
    constructor(props){
        super(props);
        this.state = { leagues: [] };
    }

    componentDidMount() {
        ajax({
            url: reverse('api-league-list'),
        }).then(data => {
            this.setState({leagues: data});
        });
    }

    render() {
        return (
            <DropdownMenu>
                { this.state.leagues.map((league)=>{
                    return <LeagueDropdownItem
                        league={league}
                        key={league.id}
                    />
                }) }
            </DropdownMenu>
        );
    }
}

module.exports = {
    LeaguesDropdownMenu: LeaguesDropdownMenu
};

import {Link} from 'react-router-dom';
import { DropdownItem, DropdownMenu, NavLink } from 'reactstrap';

import ajax from 'common/ajax';

class LeagueDropdownItem extends React.Component {
    render() {
        console.log("league.url isn't defined (TODO probably)");

        let league = this.props.league;
        let url = league.url || ".";
        return (
            <DropdownItem>
                <NavLink tag={Link} to={url}>{league.name}</NavLink>
            </DropdownItem>
        );
    }
}

class LeaguesDropdown extends React.Component {
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
    LeaguesDropdown: LeaguesDropdown
};

import {Link} from 'react-router-dom';
import { DropdownItem, DropdownMenu, NavLink } from 'reactstrap';

class LeagueDropdownItem extends React.Component {
   render(props) {
      return (
         <DropdownItem>
            <NavLink tag={Link} to={this.props.url}>{this.props.name}</NavLink>
         </DropdownItem>
      );
   }
}

class LeaguesDropdown extends React.Component {
    render() {
        let leagues = [];
        for (var i=0; i < 2; i++){
           leagues.push(<LeagueDropdownItem url='#' name={`league #${i}`}/>);
        };

        return (
           <DropdownMenu>
              {leagues}
           </DropdownMenu>
        );
    }
}

module.exports = {
   LeaguesDropdown: LeaguesDropdown
};

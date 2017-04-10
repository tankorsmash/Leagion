import {Link} from 'react-router-dom';
import {
    DropdownItem, DropdownMenu, NavLink,
    Row, Col
} from 'reactstrap';

import Spinner from 'react-spinkit';

import ajax from 'common/ajax';

import {NOT_LOADED} from 'common/constants';

class LeagueRow extends React.Component {
    render() {
        let league = this.props.league;

        const style = {
            borderBottom: "1px solid black"
        };
        return (
            <Row style={style}>
                { league.name }
            </Row>
        );
    }
}


class LeaguesList extends React.Component {
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
                return (
                    <LeagueRow league={league} key={league.id} />
                );
            });
        }

        return (
            <div>
                {content}
            </div>
        );
    }
}

class Leagues extends React.Component {
    render() {
        return (
            <LeaguesList/>
        );
    };
};

module.exports = Leagues;

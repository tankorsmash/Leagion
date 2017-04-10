import {Link} from 'react-router-dom';
import {
    DropdownItem, DropdownMenu, NavLink,
    Row, Col
} from 'reactstrap';

import Spinner from 'react-spinkit';

import ajax from 'common/ajax';

import {NOT_LOADED} from 'common/constants';

class TeamRow extends React.Component {
    render() {
        return (
            <Row className="pl-1">
                <Col>
                    { this.props.team.name }
                </Col>
            </Row>
        );
    }
}

class SeasonRow extends React.Component {
    render() {
        let teams = this.props.season.teams.map((team, i)=>{
            return ( <TeamRow key={i} team={team} /> );
        });
        return (
            <Row className="pl-1">
                <Col>
                    <h4> { this.props.season.pretty_name } </h4>
                    { teams }
                </Col>
            </Row>
        );
    }
}

class LeagueRow extends React.Component {
    render() {
        let league = this.props.league;

        let seasons = league.seasons.map((season, i)=>{
            return (
                <SeasonRow key={i} season={season}/>
            );
        });

        return (
            <Row className="mt-3">
                <Col>
                    <h3> { league.name } </h3>
                    { seasons }
                </Col>
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

import {Link, Redirect} from 'react-router-dom';
import {browserHistory} from 'react-router';
import {
    DropdownItem, DropdownMenu, NavLink,
    Row, Col, FormGroup, Form, Button, Label, Input
} from 'reactstrap';

import Spinner from 'react-spinkit';

import ajax from 'common/ajax';
import reverse from 'common/reverse';

import adminUrls from 'main/app/admin/urls';

import {NOT_LOADED} from 'common/constants';
import {buildPageTitle} from 'common/utils';
import {FormBase} from 'components/forms';


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
            <Row className="mb-3">
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
        buildPageTitle("Leagues");
        return (
            <LeaguesList/>
        );
    };
};

class LeagueCreateForm extends FormBase {
    constructor(props) {
        super(props);
        this.state = {
            'name': '',
            'created': false,
        };
    }

    handleSubmit = (e) => {
        e.preventDefault();

        ajax({
            url:reverse('api-league-list'),
            method: 'POST',
            data: {
                name: this.state.name,
            }
        }).then(data => {
            console.log("success: created League", data);
            let redirectUrl = adminUrls.leagues.index+'/'+data.id;
            this.setState({
                'created': true,
                'redirectUrl': redirectUrl,
            });

        }, error => {
            console.log("failed:", data);
            this.setState({'created': false});
        });
    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit} >
                <FormGroup>
                    <Label for="name">League name:</Label>
                    <Input onChange={this.handleInputChange} value={this.state.name} type="text" name="name" id="name" placeholder="Eastern Conference"/>
                </FormGroup>
                <Button type="submit" >Create!</Button>

                { this.state.created &&
                            (<Redirect to={this.state.redirectUrl} />)
                }
            </Form>
        );
    };
};

class LeaguesCreate extends React.Component {
    render() {
        buildPageTitle("Create League");
        return (
            <div>
                <h3>Create a league</h3>
                <LeagueCreateForm/>
            </div>
        );
    };
};

module.exports = {
    Leagues: Leagues,
    LeaguesCreate: LeaguesCreate
};

import {Link, Redirect} from 'react-router-dom';
import {browserHistory} from 'react-router';
import {
    DropdownItem, DropdownMenu, NavLink,
    Row, Col, FormGroup, Form, Button, Label, Input,
    Jumbotron,
} from 'reactstrap';

import Spinner from 'react-spinkit';

import ajax from 'common/ajax';
import reverse from 'common/reverse';

import adminUrls from 'main/app/admin/urls';

import {NOT_LOADED} from 'common/constants';
import {buildPageTitle} from 'common/utils';
import {FormBase} from 'components/forms';

import {Seasons, SeasonsCreate} from 'main/app/admin/components/seasons';


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
            <LeaguesList  />
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
            toastr.success("League Created!");
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

class LeagueDetail extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            leagueId: this.props.match.params.leagueId,
            league: []
        };
    }

    componentDidMount() {
        this.updateDataset();
    }

    /* without componentWillReceiveProps, routing back to this component, like league/1 to league/2, the data wouldn't update */
    componentWillReceiveProps(nextProps) {
        if (this.props.match.params.leagueId != nextProps.match.params.leagueId) {
            this.updateDataset();
        };
    };


    updateDataset() {
        if (this.props.match.params.leagueId) {
            console.log("making request");
            let url = reverse('api-league-detail', {"league_id" : this.props.match.params.leagueId});

            ajax({
                url: url,
            }).then(data => {
                console.log("received data:", data);
                this.setState({league: data});
            });
        };
    }
    render() {
        buildPageTitle("League Detail");
        return (
            <div>
                <h1 className="display-3">{ this.state.league.name }</h1>
                <p className="lead">League overview</p>
                <hr className="my-2" />
                <p>As a league manager, you're able to view all teams and players.
                    You'll be able to create and edit teams,
                    assign coaches and team managers, and set up schedules.</p>

                <p className="lead">Seasons</p>
                <Seasons leagueId={this.state.leagueId} />
            </div>
        );
    };
};

module.exports = {
    LeagueDetail: LeagueDetail,
    Leagues: Leagues,
    LeaguesCreate: LeaguesCreate
};

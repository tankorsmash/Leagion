import {Link, Redirect} from 'react-router-dom';
import {
    DropdownItem, DropdownMenu, NavLink,
    Row, Col, FormGroup, Form, Button, Label, Input,
    Jumbotron, Container,
} from 'reactstrap';

import Spinner from 'react-spinkit';

import ajax from 'common/ajax';
import reverse from 'common/reverse';

import adminUrls from 'main/app/admin/urls';

import {NOT_LOADED} from 'common/constants';
import {buildPageTitle} from 'common/utils';
import {FormBase} from 'components/forms';
import DatasetView from 'components/dataset_view';

import {SeasonsCardList, SeasonsCreate} from 'main/app/admin/components/seasons';
import {AjaxTextInputUpdate} from 'main/app/admin/components/ajax_update';


class LeagueCreateForm extends FormBase {
    constructor(props) {
        super(props);
        this.state = {
            'created': false,
            form: {
                'name': '',
            }
        };
    }

    handleSubmit = (e) => {
        e.preventDefault();

        ajax({
            url:reverse('api-league-list'),
            method: 'POST',
            data: this.state.form,
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
                    <Input onChange={this.handleInputChange} value={this.state.form.name} type="text" name="name" id="name" placeholder="Eastern Conference"/>
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

class LeagueDetail extends DatasetView {
    get datasetStateAttr() {
        return "league";
    }

    get datasetViewName() {
        return "api-league-detail";
    }

    get datasetViewKwargs() {
        return { league_id: this.state.leagueId };
    }

    constructor(props){
        super(props);

        let leagueId = this.props.match.params.leagueId;
        this.state = {
            ...this.state,
            leagueId: leagueId,
        };
    }

    render() {
        buildPageTitle("League Detail");

        if (this.getIsLoaded() == false) {
            return <Container fluid />;
        };

        const putUrl = reverse("api-league-detail", {league_id: this.state.league.id});
        return (
            <Container fluid>
                <h1 className="display-3">
                    <AjaxTextInputUpdate
                        data={ this.state.league.name }
                        putUrl={putUrl}
                        putKwarg="name"/>
                </h1>
                <p className="lead">League overview</p>
                <hr className="my-2" />
                <p>As a league manager, you're able to view all teams and players.
                    You'll be able to create and edit teams,
                    assign coaches and team managers, and set up schedules.</p>

                <p className="lead">Seasons</p>

                <SeasonsCardList leagueId={this.state.leagueId} />
            </Container>
        );
    };
};

module.exports = {
    LeagueDetail: LeagueDetail,
    LeaguesCreate: LeaguesCreate
};

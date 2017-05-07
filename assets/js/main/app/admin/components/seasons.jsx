import {Link} from 'react-router-dom';
import {
    DropdownItem, DropdownMenu, NavLink, Jumbotron,
    Row, Col, Card, CardImg, CardText, CardBlock,
    FormGroup, Form, Button, Label, Input,
    CardTitle, CardSubtitle, Container,
    Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';

import Spinner from 'react-spinkit';
import Datetime from 'react-datetime';
import Moment from 'react-moment';

import adminUrls from 'main/app/admin/urls';
import pathToRegex from 'path-to-regexp';

import {DATE_FORMAT} from 'main/app/admin/constants';
import {GeneralTable} from 'main/app/admin/components/table'

import {FormBase} from 'components/forms';

import ajax from 'common/ajax';

import {NOT_LOADED} from 'common/constants';
import {buildPageTitle} from 'common/utils';
import {DatasetView} from 'components/dataset_view';

class Season extends React.Component {
    render() {
        let season = this.props.season;
        const url = pathToRegex.compile(adminUrls.seasons.detail)({seasonId: season.id});
        return (
            <Card>
                <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97120&w=318&h=120" alt="Card image cap" />
                <CardBlock>
                    <CardTitle>
                        { season.start_date } to {season.end_date}
                    </CardTitle>
                    <CardSubtitle>Notes</CardSubtitle>

                    <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                    <Button>
                        <Link to={url}>
                            Details
                        </Link>
                    </Button>
                </CardBlock>
            </Card>
        );
    }
}

class CreateSeasonModal extends FormBase {
    constructor(props) {
        super(props);
        this.state = {
            'modal': false,
            'name': '',
            'start_date': '',
            'end_date': '',
            'created': false,
        };

        this.toggle = this.toggle.bind(this);
    }

    handleSubmit = (e) => {
        e.preventDefault();

        ajax({
            url:reverse('api-season-list'),
            method: 'POST',
            data: {
                name: this.state.name,
                start_date: this.state.start_date,
                end_date: this.state.end_date,
                league: this.props.leagueId,
            }
        }).then(data => {
            console.log("success: created season", data);
            let redirectUrl = this.props.redirectUrl; //adminUrls.seasons.index+'/'+data.id;
            this.setState({
                'created': true,
                'redirectUrl': redirectUrl,
                'modal': false,
            });

            toastr.success("Season Created!");
            //regenerate season grid in league detail
            if (this.props.triggerRefreshOnGrid !== undefined) {
                this.props.triggerRefreshOnGrid();
            };

        }, error => {
            console.log("failed:", error);
            this.setState({'created': false});
        });
    }

    handleStartDateChange = (moment) => {
        if (!moment._isAMomentObject){
            console.warn("invalid date format for start date");
            return;
        };
        this.setState({
            "start_date": moment.format(DATE_FORMAT),
        });
    };

    handleEndDateChange = (moment) => {
        if (!moment._isAMomentObject){
            console.warn("invalid date format for end date");
            return;
        };

        this.setState({
            "end_date": moment.format(DATE_FORMAT),
        });
    };

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    render() {
        return (
            <div>
                <Button onClick={this.toggle}>{this.props.buttonLabel}</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Add a season</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleSubmit} >
                            <FormGroup>
                                <Label for="name">League name:</Label>
                                <Input onChange={this.handleInputChange} value={this.state.name} type="text" name="name" id="name" placeholder="2016-2018 Season"/>

                                <Label for="">Start date:</Label>
                                <Datetime dateFormat={DATE_FORMAT} timeFormat={false} onChange={this.handleStartDateChange} value={this.state.start_date} type="date" name="start_date" id="start_date" placeholder="2016/01/30"/>

                                <Label for="name">End date:</Label>
                                <Datetime dateFormat={DATE_FORMAT} timeFormat={false} onChange={this.handleEndDateChange} value={this.state.end_date} type="date" name="end_date" id="end_date" placeholder="2017/03/20"/>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.handleSubmit}>Create!</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

class CreateSeasonPlaceholder extends React.Component {
    render() {
        return (
            <Card>
                <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=Create%20a%20season&w=318&h=120" alt="Card image cap" />
                <CardBlock>
                    <CardTitle>
                        Create a season
                    </CardTitle>
                    <CardText>Add a season to the league.</CardText>
                    <CreateSeasonModal
                        triggerRefreshOnGrid={this.props.triggerRefreshOnGrid}
                        leagueId={this.props.leagueId}
                        buttonLabel="Create"/>
                </CardBlock>
            </Card>
        );
    }
}


class SeasonsCardList extends React.Component {
    constructor(props){
        super(props);
        this.state = { seasons: NOT_LOADED };
    }

    componentDidMount() {
        this.updateDataset();
    }

    updateDataset = () => {
        let url = reverse('api-league-season-list', {"league_id": this.props.leagueId});

        ajax({
            url: url,
        }).then(data => {
            this.setState({seasons: data});
        }, error => {
            console.warn(error);
        });
    }

    render() {
        let isLoaded = this.state.seasons !== NOT_LOADED;

        let content;
        if (isLoaded == false) {
            content = <Spinner spinnerName='three-bounce' />;
        } else {
            let seasons = this.state.seasons.map((season)=>{
                return <Season season={season} key={season.id} />
            });

            //append placeholder card
            seasons.unshift(
                <CreateSeasonPlaceholder
                    triggerRefreshOnGrid={this.updateDataset}
                    leagueId={this.props.leagueId} />
            );

            content = [];
            for (let i = 0; i <= seasons.length; i+=3) {
                content.push(
                    <Row key={i}>
                        <Col key={i} xs="4"> {seasons[i]} </Col>
                        <Col key={i+1} xs="4"> {seasons[i+1]} </Col>
                        <Col key={i+2} xs="4"> {seasons[i+2]} </Col>
                    </Row>);
            };
        }

        return <div>{content}</div>;
    }
}

class SeasonsCreate extends React.Component {
    render() {
        buildPageTitle("Seasons Create");
        return (
            <div> Seasons Create </div>
        );
    };
};

class SeasonDateEditor extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            expanded: false,
            date : this.props.date,
        };
    }

    handleDateChanged = (moment) => {
        if (!moment._isAMomentObject){
            console.warn("invalid date format for start date");
            return;
        };

        const serializedDate = moment.format(DATE_FORMAT);

        this.setState({
            date : serializedDate,
            expanded: !this.state.expanded,
        });

        ajax({
            url:this.props.putUrl,
            method: 'PATCH',
            data: {
                [this.props.putKwarg]: serializedDate,
            }

        }).then(data => {
            console.log("success: updated", data);
            toastr.success("Season updated!");
        }, error => {
            console.log("failed:", error);
            toastr.error("Season update failed, please try again.");
        });

        console.log("updating seasondate state");

    };


    render() {
        if (this.state.expanded == false) {
            return  <Moment onClick={(e)=>{this.setState({expanded: true});}} format="MMMM, Y" date={ this.state.date }/>;
        } else {
            return (
                <Datetime
                    dateFormat={DATE_FORMAT}
                    timeFormat={false}
                    closeOnSelect={true}
                    disableOnClickOutside={true}
                    input={false}
                    onChange={this.handleDateChanged}
                    onBlur={(e)=>{this.setState({expanded: true});}}
                    defaultValue={ this.state.date }/>
            );
        }
    }
};

class SeasonDetail extends DatasetView {
    constructor(props){
        super(props);

        //DatasetView sets state already
        this.state['start_date_expanded'] = false;
        this.state['end_date_expanded'] = false;

    }
    get datasetStateAttr() {
        return "season";
    }

    get datasetViewName() {
        return "api-season-detail";
    }

    get datasetViewKwargs() {
        return {season_id: this.props.match.params.seasonId };
    }

    render() {
        buildPageTitle("Seasons Detail");
        if (this.getIsLoaded() == false) {
            return <Container fluid/>;
        };

        let season = this.state.season;

        const matchUrlizer = pathToRegex.compile(adminUrls.matches.detail);
        const matchColumns = [{
            id: "pretty_name",
            title: `Match (total: ${season.matches.length})`,
            component: props => <td> <Link to={matchUrlizer({matchId: props.data.id})}> {props.data.pretty_name} </Link> </td>
        }];

        const teamUrlizer = pathToRegex.compile(adminUrls.teams.detail);
        const teamColumns = [{
            id: "name",
            title: `Team (total: ${season.teams.length})`,
            component: props => <td> <Link to={teamUrlizer({teamId: props.data.id})}> {props.data.name} </Link> </td>
        }];

        const url = reverse("api-season-detail", {season_id: season.id});
        return (
            <Container fluid>
                <div className="d-flex justify-content-start">
                    <h4 className="pr-1">
                        <SeasonDateEditor putKwarg="start_date" putUrl={url} date={this.state.season.start_date} />
                        &nbsp;-&nbsp;
                        <SeasonDateEditor putKwarg="end_date" putUrl={url} date={this.state.season.end_date} />
                    </h4>
                    <div>
                        <small className="text-muted"> { season.league.name } </small>
                    </div>
                </div>
                <div>
                    <GeneralTable columns={teamColumns} rowData={season.teams} />
                </div>
                <div>
                    <GeneralTable columns={matchColumns} rowData={season.matches} />
                </div>
            </Container>
        );
    };
};

module.exports = {
    SeasonsCardList: SeasonsCardList,
    SeasonDetail: SeasonDetail,
    SeasonsCreate: SeasonsCreate
};

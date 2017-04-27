import {Link} from 'react-router-dom';
import {
    DropdownItem, DropdownMenu, NavLink, Jumbotron,
    Row, Col, Card, CardImg, CardText, CardBlock,
    FormGroup, Form, Button, Label, Input,
    CardTitle, CardSubtitle,
    Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';

import Spinner from 'react-spinkit';
import Datetime from 'react-datetime';

import {FormBase} from 'components/forms';

import ajax from 'common/ajax';

import {NOT_LOADED} from 'common/constants';
import {buildPageTitle} from 'common/utils';

class Season extends React.Component {
    render() {
        let season = this.props.season;
        return (
            <Card>
                <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
                <CardBlock>
                    <CardTitle>
                        Season name: { season.pretty_name }
                    </CardTitle>
                    <CardSubtitle>Card subtitle</CardSubtitle>
                    <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                    <Button>Details</Button>
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
            "start_date": moment.format("YYYY-MM-DD"),
        });
    };

    handleEndDateChange = (moment) => {
        if (!moment._isAMomentObject){
            console.warn("invalid date format for end date");
            return;
        };

        this.setState({
            "end_date": moment.format("YYYY-MM-DD"),
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
                                <Datetime input={false} dateFormat="YYYY-MM-DD" timeFormat={false} onChange={this.handleStartDateChange} value={this.state.start_date} type="date" name="start_date" id="start_date" placeholder="2016/01/30"/>

                                <Label for="name">End date:</Label>
                                <Datetime input={false} dateFormat="YYYY-MM-DD" timeFormat={false} onChange={this.handleEndDateChange} value={this.state.end_date} type="date" name="end_date" id="end_date" placeholder="2017/03/20"/>
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
                <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=Create%20a%20season&w=318&h=180" alt="Card image cap" />
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


class SeasonsList extends React.Component {
    constructor(props){
        super(props);
        this.state = { seasons: NOT_LOADED };
    }

    componentDidMount() {
        this.updateDataset();
    }

    updateDataset = () => {
        let url = reverse('api-season-list');

        ajax({
            url: url,
        }).then(data => {
            this.setState({seasons: data});
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
            seasons.push(
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

class Seasons extends React.Component {
    render() {
        return (
            <SeasonsList leagueId={this.props.leagueId} />
        );
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

module.exports = {
    Seasons: Seasons,
    SeasonsCreate: SeasonsCreate
};

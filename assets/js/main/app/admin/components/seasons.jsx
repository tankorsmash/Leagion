import {Link} from 'react-router-dom';
import {
    DropdownItem, DropdownMenu, NavLink, Jumbotron,
    Row, Col, Card, CardImg, CardText, CardBlock,
    FormGroup, Form, Button, Label, Input,
    CardTitle, CardSubtitle,
    Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';

import Spinner from 'react-spinkit';

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

class SeasonCreateForm extends FormBase {
    constructor(props) {
        super(props);
        this.state = {
            'name': '',
            'start_date': '',
            'end_date': '',
            'created': false,
        };
    }

    handleSubmit = (e) => {
        e.preventDefault();

        ajax({
            url:reverse('api-season-list'),
            method: 'POST',
            data: {
                name: this.state.name,
                start_date: this.state.start_date,
                end_Date: this.state.end_Date,
            }
        }).then(data => {
            console.log("success: created season", data);
            let redirectUrl = this.props.redirectUrl; //adminUrls.seasons.index+'/'+data.id;
            this.setState({
                'created': true,
                'redirectUrl': redirectUrl,
            });

        }, error => {
            console.log("failed:", error);
            this.setState({'created': false});
        });
    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit} >
                <FormGroup>
                    <Label for="name">League name:</Label>
                    <Input onChange={this.handleInputChange} value={this.state.name} type="text" name="name" id="name" placeholder="2016-2018 Season"/>

                    <Label for="">Start date:</Label>
                    <Input onChange={this.handleInputChange} value={this.state.start_date} type="date" name="start_date" id="start_date" placeholder="Jan 8th 2016"/>

                    <Label for="name">End date:</Label>
                    <Input onChange={this.handleInputChange} value={this.state.end_date} type="date" name="end_date" id="end_date" placeholder="Aug 21st 2018"/>

                    <Button type="submit" >Create!</Button>
                </FormGroup>
            </Form>
        );
    };
};

class CreateSeasonModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

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
              <SeasonCreateForm/>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
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
                    <CreateSeasonModal buttonLabel="Create"/>
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
            seasons.push(<CreateSeasonPlaceholder/>);

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
            <SeasonsList/>
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

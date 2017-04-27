import {Link} from 'react-router-dom';
import {
    DropdownItem, DropdownMenu, NavLink, Jumbotron,
    Row, Col, Card, CardImg, CardText, CardBlock,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';

import Spinner from 'react-spinkit';

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

class CreateSeasonPlaceholder extends React.Component {
    render() {
        return (
            <Card>
                <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=Create%20a%20season&w=318&h=180" alt="Card image cap" />
                <CardBlock>
                    <CardTitle>
                        Create a season
                    </CardTitle>
                    <CardText>Create and add a season to this league</CardText>
                    <Button>Create (placeholder)</Button>
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
                content.push(<Row>
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

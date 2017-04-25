import {Link} from 'react-router-dom';
import {
    DropdownItem, DropdownMenu, NavLink, Jumbotron,
    Row, Col, Card
} from 'reactstrap';

import Spinner from 'react-spinkit';

import ajax from 'common/ajax';

import {NOT_LOADED} from 'common/constants';
import {buildPageTitle} from 'common/utils';

class Season extends React.Component {
    render() {
        let season = this.props.season;
        return (
            <div>
                Season name: { season.pretty_name }
            </div>
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
            content = this.state.seasons.map((season)=>{
                return <Season season={season} key={season.id} />
            });
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

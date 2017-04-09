import {Switch, Link} from 'react-router-dom';
import {Route} from 'components/router';
import {AsyncBase} from 'components/base';

import { Card, CardImg, CardText, CardBlock,
  CardTitle, CardSubtitle, Button, CardLink } from 'reactstrap';

import playerUrls from 'main/app/player/urls';
import seasonUrls from 'main/app/player/season/urls';
import teamUrls from 'main/app/player/team/urls';

import Dashboard from 'main/app/player/dashboard';

import {FourOhFour} from 'components/error-pages';

import ajax from 'common/ajax';

const SeasonCard = (props) => {
    let season = props.season;

    return (
        <div>
            <Card>
                <CardBlock>
                    <CardTitle><Link to={`${seasonUrls.index}/${season.id}`}>{season.name}</Link></CardTitle>
                    <CardSubtitle>{season.sport}</CardSubtitle>
                    <CardText>
                        Team: {<Link to={`${teamUrls.index}/${season.my_team.id}`}>{season.my_team.name}</Link>}
                        Upcoming Match: 
                    </CardText>
                </CardBlock>
            </Card>
        </div>
    );
};

class SeasonListItem extends React.Component {
    render() {
        let season = this.props.season;
        return (
            <Link to={`${seasonUrls.index}/${season.id}`}>{season.name}</Link>
        );
    }
}

class SeasonList extends AsyncBase {
    url = reverse('api-my-season-list');
    state = { seasons: [] };

    getComponent() {
        return (
            <div>
                { this.state.seasons.map((season)=>{
                    return <SeasonCard
                        season={season}
                        key={season.id}
                    />
                }) }
            </div>
        );
    }
}

class SeasonDetail extends AsyncBase {
    url = reverse('api-my-season-detail');
    state = { season: {} };

    getComponent() {
        return (
            <div></div>
        );
    }
}

class Season extends React.Component {

    render() {
        return (
            <Switch>
                <Route path={seasonUrls.index} component={SeasonList} />
                <Route component={FourOhFour} />
            </Switch>
        );
    }
}

module.exports = {
    Season: Season,
    SeasonList: SeasonList,

};


import {Switch, Link} from 'react-router-dom';
import {Route} from 'components/router';
import {AsyncBase} from 'components/base';

import { Card, CardImg, CardText, CardBlock,
  CardTitle, CardSubtitle, Button, CardLink } from 'reactstrap';

import seasonUrls from 'main/app/player/season/urls';

import {FourOhFour} from 'components/error-pages';

import ajax from 'common/ajax';

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
                    return <SeasonListItem
                        season={season}
                        key={season.id}
                    />
                }) }
            </div>
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


import {Switch, Link} from 'react-router-dom';
import {Route} from 'components/router';

import playerUrls from 'main/app/player/urls';
import leagueUrls from 'main/app/player/league/urls';

import Dashboard from 'main/app/player/dashboard';

import {FourOhFour} from 'components/error-pages';

import ajax from 'common/ajax';

class LeagueListItem extends React.Component {
    render() {
        let league = this.props.league;
        return (
            <Link to={`${leagueUrls.index}/${league.id}`}>{league.name}</Link>
        );
    }
}

class LeagueList extends React.Component {
    constructor(props){
        super(props);
        this.state = { leagues: [] };
    }

    render() {
        return (
            <div>
                { this.state.leagues.map((league)=>{
                    return <LeagueListItem
                        league={league}
                        key={league.id}
                    />
                }) }
            </div>
        );
    }

    componentDidMount() {
        this.updateDataset();
    }

    updateDataset() {
        let url = reverse('api-my-league-list');

        ajax({
            url: url,
        }).then(data => {
            this.setState({leagues: data});
        });
    }
}
class League extends React.Component {

    render() {
        return (
            <Switch>
                <Route path={leagueUrls.index} component={LeagueList} />
                <Route component={FourOhFour} />
            </Switch>
        );
    }
}

module.exports = League;


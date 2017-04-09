import {Switch, Link} from 'react-router-dom';
import {Route} from 'components/router';
import SpinLoader from 'components/spinloader';

import { Card, CardImg, CardText, CardBlock,
    CardTitle, CardSubtitle, Button, Jumbotron } from 'reactstrap';

import {LeagueJumbo} from 'components/app/league'
import leagueUrls from 'main/app/player/league/urls';

import {FourOhFour} from 'components/error-pages';

import ajax from 'common/ajax';

class LeagueList extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = { 
            leagues: [],
            loaded: false
        };
    };

    componentDidMount() {
        ajax({
            url: reverse('api-my-league-list'),
        }).then(data => {
            this.setState({
                leagues: data,
                loaded: true
            });
        });
    }

    render() {
        return (
            <SpinLoader loaded={this.loaded}>
                <div>
                    <h2>My Teams</h2>
                    { this.state.leagues.map((league)=>{
                        return <LeagueJumbo
                            league={league}
                            key={league.id}
                        />
                    }) }
                </div>
            </SpinLoader>
        );
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

module.exports = {
    League: League,
    LeagueList: LeagueList,

};


import {Switch, Redirect} from 'react-router-dom';
import {Route} from 'components/router';

import adminUrls from 'main/app/admin/urls';
import auth from 'main/auth';

import AdminNavbar from 'main/app/admin/nav';
import LeagueIndex from 'main/app/admin/league/index';
import LeagueRouter from 'main/app/admin/league/routes';

import {FourOhFour} from 'components/error-pages';

export default class AdminRouter extends React.Component {
    render() {

        const {user} = this.props;

        if (!(auth.commissionerOrBetter(user))) {
            return ( <Redirect exact to={"/"} /> );
        }
        return (
            <div id="leagion-admin" >
                <AdminNavbar {...this.props} />
                <Switch>
                    <Route exact path={adminUrls.index} component={LeagueIndex} user={user}/>
                    <Route path={adminUrls.leagueIndex} component={LeagueRouter} user={user}/>

                    {/*TODO remove this
                    <Route path={adminUrls.dashboard.index}  component={Dashboard} />

                    <Route exact path={adminUrls.leagues.create}  component={LeaguesCreate} />
                    <Route path={adminUrls.leagues.detail}  component={LeagueDetail} />

                    <Route exact path={adminUrls.seasons.create}  component={SeasonsCreate} />
                    <Route exact path={adminUrls.seasons.detail}  component={SeasonDetail} />

                    <Route exact path={adminUrls.locations.detail}  component={LocationDetail} />

                    <Route exact path={adminUrls.teams.create}  component={TeamsCreate} />
                    <Route path={adminUrls.teams.detail}  component={TeamDetail} />

                    <Route exact path={adminUrls.matches.create}  component={MatchesCreate} />
                    <Route path={adminUrls.matches.detail}  component={MatchDetail} />

                    <Route path={adminUrls.players.detail}  component={PlayerDetail} />
                    */}
                    <Route component={FourOhFour} />
                </Switch>
            </div>
        );
    }
}

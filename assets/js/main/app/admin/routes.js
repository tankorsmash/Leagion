import {Switch, Redirect} from 'react-router-dom';
import {Route} from 'components/router';

import {Row, Col} from 'reactstrap';

import adminUrls from 'main/app/admin/urls';

import auth from 'main/auth';

import AdminNavbar from 'main/app/admin/nav';
import Dashboard from 'main/app/admin/dashboard';
import {LeagueDetail, LeaguesCreate} from 'main/app/admin/details/leagues';
import {SeasonDetail, SeasonsCreate} from 'main/app/admin/details/seasons';
import {LocationDetail} from 'main/app/admin/details/locations';
import {TeamDetail, TeamsCreate} from 'main/app/admin/details/teams';
import {MatchDetail, MatchesCreate} from 'main/app/admin/details/matches';
import PlayerDetail from 'main/app/admin/details/players';

import {FourOhFour} from 'components/error-pages';
import style from 'app.scss';

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
                    <Redirect exact from={adminUrls.index} to={adminUrls.dashboard.overview} />
                    <Redirect exact from={adminUrls.dashboard.index} to={adminUrls.dashboard.overview} />
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

                    <Route component={FourOhFour} />
                </Switch>
            </div>
        );
    }
}

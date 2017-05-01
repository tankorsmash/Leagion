import {Switch} from 'react-router-dom';
import {Route} from 'components/router';

import {Row, Col} from 'reactstrap';

import adminUrls from 'main/app/admin/urls';

import AdminNavbar from 'main/app/admin/nav';
import Dashboard from 'main/app/admin/dashboard';
import {LeagueDetail, Leagues, LeaguesCreate} from 'main/app/admin/components/leagues';
import {Seasons, SeasonDetail, SeasonsCreate} from 'main/app/admin/components/seasons';
import {Teams, TeamsCreate} from 'main/app/admin/components/teams';
import {Matches, MatchesCreate} from 'main/app/admin/components/matches';

import {FourOhFour} from 'components/error-pages';

import style from 'app.scss';


class Admin extends React.Component {
    render() {
        return (
            <div id="leagion-admin" >
                <AdminNavbar {...this.props} />
                <Switch>
                    <Route exact path={adminUrls.index}  component={Dashboard} />

                    <Route exact path={adminUrls.leagues.create}  component={LeaguesCreate} />
                    <Route path={adminUrls.leagues.detail}  component={LeagueDetail} />
                    <Route path={adminUrls.leagues.index}  component={Leagues} />

                    <Route exact path={adminUrls.seasons.create}  component={SeasonsCreate} />
                    <Route exact path={adminUrls.seasons.detail}  component={SeasonDetail} />

                    <Route exact path={adminUrls.teams.create}  component={TeamsCreate} />
                    <Route path={adminUrls.teams.detail}  component={Teams} />

                    <Route exact path={adminUrls.matches.create}  component={MatchesCreate} />
                    <Route path={adminUrls.matches.detail}  component={Matches} />

                    <Route component={FourOhFour} />
                </Switch>
            </div>
        );
    }
}

module.exports = Admin;

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import ajax from 'common/ajax';
import urls from 'common/urls';
import {NOT_LOADED} from 'common/constants';

import auth from 'main/auth';

import Dashboard from 'main/app/player/dashboard';
import Leagues from 'main/app/components/leagues';
import Teams from 'main/app/components/teams';
import Matches from 'main/app/components/matches';

import {FourOhFour} from 'components/error-pages';

class App extends React.Component {
   componentDidMount() {
      this.loadUserData();
   }

   loadUserData() {
      ajax({
         url: reverse('rest_user_details'),
      }).then(data => {
         localStorage.id = data.id;
         localStorage.email = data.email;
         localStorage.name = data.name;
      });
   }

   render() {
      return (
         <Switch>
            <Route exact path={urls.app.index} component={Dashboard} />
            <Route path={urls.app.leagues.detail} component={Leagues} />
            <Route path={urls.app.teams.detail} component={Teams} />
            <Route path={urls.app.matches.detail} component={Matches} />
            <Route component={FourOhFour} />
         </Switch>
      );
   }
}

module.exports = App;

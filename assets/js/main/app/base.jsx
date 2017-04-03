import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Dashboard from 'main/app/dashboard';
import Teams from 'main/app/teams';
import Matches from 'main/app/matches';
import auth from 'main/auth';

import ajax from 'common/ajax';
import urls from 'common/urls';

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
            <Route path={urls.app.teams.index} component={Teams} />
            <Route path={urls.app.matches.index} component={Matches} />
            <Route component={FourOhFour} />
         </Switch>
      );
   }
}

module.exports = App;

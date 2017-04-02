import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Dashboard from 'main/app/dashboard';
import Teams from 'main/app/teams';
import auth from 'main/auth';
import ajax from 'common/ajax';
import urls from 'common/urls';

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
            <Route exact path={urls.app.teams.index} component={Teams} />
         </Switch>
      );
   }
}

module.exports = App;

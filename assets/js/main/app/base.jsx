import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import auth from 'main/auth';
import ajax from 'common/ajax';
import urls from 'common/urls';

class Dashboard extends React.Component {
   render() {
      return (
         <div>
            this is Dashboard
         </div>
      );
   }
}

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
         </Switch>
      );
   }
}

module.exports = App;

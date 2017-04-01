import {BrowserRouter as Router} from 'react-router-dom';
import {auth} from 'main/registration'
import ajax from 'common/ajax';

class App extends React.Component {
    constructor(props) {

        super(props);
        this.state = {
           user: []
        };
    }

   componentDidMount() {
      this.loadUserData();

   }

   loadUserData() {

        ajax({
            url: reverse('rest_user_details'),
        }).then(data => {
           console.log(data);
        });
   }

   render() {
      return (
         <div>
            <h1>You are now logged in, {this.state.user.username}</h1>
            <button onClick={this.logoutHandler}>Log out</button>
         </div>
      );        
   }
}

module.exports = App;

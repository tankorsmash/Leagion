import {BrowserRouter as Router} from 'react-router-dom';
import {auth} from 'main/registration'
import ajax from 'common/ajax';

class App extends React.Component {
    constructor(props) {

        super(props);
        this.state = {
           user: {}
        };
    }

   componentDidMount() {
      this.loadUserData();

   }

   loadUserData() {

        ajax({
            url: reverse('rest_user_details'),
        }).then(data => {
           this.setState({user: data})
           console.log(data);
           console.log(this.state);
        });
   }

   render() {
      return (
         <div>
            <h1>You are now logged in, {this.state.user.full_name}</h1>
         </div>
      );        
   }
}

module.exports = App;

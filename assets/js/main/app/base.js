import update from 'immutability-helper';
import {Switch} from 'react-router-dom';
import {Route} from 'components/router';

import ajax from 'common/ajax';

import appUrls from 'main/app/urls';
import adminUrls from 'main/app/admin/urls';
import playerUrls from 'main/app/player/urls';

import Admin from 'main/app/admin/base';
import Player from 'main/app/player/base';
import {FourOhFour} from 'components/error-pages';


class App extends React.Component {
    constructor(props){
        super(props);

        this.state = { 
            user: {}
        };

        this.setUserState = this.setUserState.bind(this);
    }

    componentDidMount() {
        ajax({
            url: reverse('api-my-details'),
        }).then(data => {
            this.setState({user: data});
        });
    }

    setUserState(newUser) {
        this.setState({
            user: newUser,
        });
    }

    render() {
        return (
            <Switch>
                <Route exact path={appUrls.index} {...this.state} component={Player} />
                <Route path={adminUrls.index} {...this.state} component={Admin} />
                <Route path={playerUrls.index} setUserState={this.setUserState} {...this.state} component={Player} />
                <Route component={FourOhFour} />
            </Switch>
        );
    }
}

module.exports = App;

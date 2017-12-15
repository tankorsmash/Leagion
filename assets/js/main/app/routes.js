import {Switch, Redirect} from 'react-router-dom';
import {Route} from 'components/router';
import update from 'immutability-helper';

import ajax from 'common/ajax';

import appUrls from 'main/app/urls';
import adminUrls from 'main/app/admin/urls';
import playerUrls from 'main/app/player/urls';

import AdminRouter from 'main/app/admin/routes';
import PlayerRouter from 'main/app/player/routes';
import {FourOhFour} from 'components/error-pages';
import SpinLoader from 'components/spinloader';


class AppRouter extends React.Component {
    state = {
        user: {},
        role: null,
        userLoaded: false,
        constantsLoaded: false,
        roleLoaded: false,
        reload: false,
    };

    componentDidMount() {
        ajax({url: reverse('api-my-details')}).then(data => {
            this.setState({user: data, userLoaded: true});
        });

        ajax({url: reverse('api-site-constants')}).then(data => {
            this.setState({constants: data, constantsLoaded: true});
        });

        ajax({url: reverse('api-my-role')}).then(data => {
            this.setState({role: data.role, roleLoaded: true});
        });
    }

    setUserState = (newUser) => {
        this.setState({
            user: newUser,
        });
    };

    changeRole = role => {
        ajax({
            url: reverse('api-my-role'),
            data: {role: role},
            method: 'POST',
        }).then(data => {
            this.setState({reload: true});
        });
    };

    render() {
        const {userLoaded, constantsLoaded, roleLoaded, role, reload} = this.state;

        if (reload) {
            return (<Redirect exact to={'/'} /> );
        }

        return (
            <SpinLoader loaded={userLoaded && constantsLoaded && roleLoaded}>
                <Switch>
                    {role === 'player' &&
                        <Route exact path={appUrls.index}changeRole={this.changeRole} {...this.state} component={PlayerRouter} />
                    }
                    {role === 'player' &&
                        <Route path={playerUrls.index} changeRole={this.changeRole} setUserState={this.setUserState} {...this.state} component={PlayerRouter} />
                    }
                    {role === 'commissioner' &&
                        <Route path={adminUrls.index} changeRole={this.changeRole} setUserState={this.setUserState} {...this.state} component={AdminRouter} />
                    }
                    <Route component={FourOhFour} />
                </Switch>
            </SpinLoader>
        );
    }
}

module.exports = AppRouter;

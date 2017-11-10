import {Switch} from 'react-router-dom';
import {Route} from 'components/router';

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
        userLoaded: false,
        constantsLoaded: false,
    };

    componentDidMount() {
        ajax({
            url: reverse('api-my-details'),
        }).then(data => {
            this.setState({
                user: data,
                userLoaded: true,
            });
        });

        ajax({
            url: reverse('api-site-constants'),
        }).then(data => {

            this.setState({
                constants: data,
                constantsLoaded: true,
            });
        });
    }

    setUserState = (newUser) => {
        this.setState({
            user: newUser,
        });
    };

    render() {
        return (
            <SpinLoader loaded={this.state.userLoaded && this.state.constantsLoaded}>
                <Switch>
                    <Route exact path={appUrls.index} {...this.state} component={PlayerRouter} />
                    <Route path={adminUrls.index} {...this.state} component={AdminRouter} />
                    <Route path={playerUrls.index} setUserState={this.setUserState} {...this.state} component={PlayerRouter} />
                    <Route component={FourOhFour} />
                </Switch>
            </SpinLoader>
        );
    }
}

module.exports = AppRouter;

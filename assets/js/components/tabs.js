import {ErrorBoundary} from 'react';
import PropTypes from 'prop-types';

import {Switch, Link, Redirect, NavLink as RouterNavLink} from 'react-router-dom';
import {Route} from 'components/router';

import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';


//TODO remove this import
import teamUrls from 'main/app/player/team/urls';
import pathToRegex from 'path-to-regexp';


export default class Tabs extends React.Component {
	static propTypes = {
        tabs: PropTypes.arrayOf(PropTypes.shape({
            label: PropTypes.string.isRequired,
            content: PropTypes.func.isRequired,
        })),

        //ie 'app/team/:teamid/'
        defaultPath: PropTypes.string.isRequired,
        //ie '{teamId: 5}' or '(args) => { teamId: args.id }' (TODO havent implemented the func support though)
        pathParams: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
        //ie 'team-detail' to make: app/team/:teamid/team-detail
        defaultPathName: PropTypes.string.isRequired,
	};

    constructor(props) {
        super(props);

        this.state = {
            activeTab: 0,
        };
    }

    buildUrlFromId(id) {
        //TODO pass this root as a prop
        const urlizer = pathToRegex.compile(this.props.defaultPath);
        const url = urlizer(this.props.pathParams);
        return `${url}/${id}`;
    }

	toggle(tab) {
		if (this.state.activeTab !== tab) {
			this.setState({
				activeTab: tab
			});
		}
	}

	render() {
        const defaultPathName = this.props.defaultPathName;
		return (
			<div className={this.props.className + ' tab-wrapper'}>
				<Nav tabs>
					{this.props.tabs.map((tab, i) => {
						return (
							<NavItem key={i}>
                                <RouterNavLink to={this.buildUrlFromId(tab.id)} className="nav-link" activeClassName="active">
                                    {tab.label}
                                </RouterNavLink>
							</NavItem>
						);
					})}
				</Nav>
				<TabContent activeTab={this.state.activeTab}>
                    <Switch>
                        {this.props.tabs.map((tab, i) => {
                            let url = this.buildUrlFromId(tab.id);
                            return (
                                <Route key={tab.id} path={url} component={tab.content} />
                            );
                        })}
                        <Redirect from={this.props.defaultPath} to={this.buildUrlFromId(defaultPathName)} />
                    </Switch>
				</TabContent>
			</div>
		);
	}
}

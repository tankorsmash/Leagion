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
        }))
	};

    constructor(props) {
        super(props);

        this.state = {
            activeTab: 0,
        };
    }

    buildUrlFromId(id) {
        //TODO pass this root as a prop
        const teamUrlizer = pathToRegex.compile(teamUrls.detail);
        const url = teamUrlizer({teamId: 5});
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
        const PLACEHOLDER = "team-members";
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
                        <Redirect from={teamUrls.detail} to={this.buildUrlFromId(PLACEHOLDER)} />
                    </Switch>
				</TabContent>
			</div>
		);
	}
}

import {ErrorBoundary} from 'react';
import PropTypes from 'prop-types';

import {Switch, Link, Redirect, NavLink as RouterNavLink} from 'react-router-dom';
import {Route} from 'components/router';

import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';

import pathToRegex from 'path-to-regexp';


export default class Tabs extends React.Component {
    static propTypes = {
        tabs: PropTypes.arrayOf(PropTypes.shape({
            label: PropTypes.string.isRequired,
            content: PropTypes.element.isRequired,
        })),

        //ie 'app/team/:teamid/'
        basePath: PropTypes.string.isRequired,
        //ie '{teamId: 5}' or '(args) => { teamId: args.id }'
        pathParams: PropTypes.object,
    };

    constructor(props) {
        super(props);
        this.state = {activeTab: 0};
        this.basePath = props.basePath;
    }

    buildUrlFromId(id) {
        //TODO pass this root as a prop
        const urlizer = pathToRegex.compile(this.props.basePath);
        const url = urlizer(this.props.pathParams || {});
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
        const {basePath, tabs} = this.props;
        const {activeTab} = this.state;

        return (
            <div className={this.props.className + ' tab-wrapper'}>
                <Nav tabs>
                    {tabs.map((tab, i) => {
                        return (
                            <NavItem key={i}>
                                <RouterNavLink to={this.buildUrlFromId(tab.id)} className="nav-link" activeClassName="active">
                                    {tab.label}
                                </RouterNavLink>
                            </NavItem>
                        );
                    })}
                </Nav>
                <TabContent activeTab={activeTab}>
                    <Switch>
                        {tabs.map((tab) => {
                            let url = this.buildUrlFromId(tab.id);
                            return (
                                <Route key={tab.id} path={url} component={() => tab.content} />
                            );
                        })}
                        <Redirect from={basePath} to={this.buildUrlFromId(tabs[0].id)} />
                    </Switch>
                </TabContent>
            </div>
        );
    }
}

import PropTypes from 'prop-types';

import {Switch, Link, Redirect, NavLink as RouterNavLink} from 'react-router-dom';
import {Route} from 'components/router';

import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';

import pathToRegex from 'path-to-regexp';


export class RoutedTabs extends React.Component {
    static propTypes = {
        tabs: PropTypes.arrayOf(PropTypes.shape({
            label: PropTypes.string.isRequired,
            content: PropTypes.element.isRequired,
        })),
        basePath: PropTypes.string.isRequired, //ie 'app/team/:teamid/'
        pathParams: PropTypes.object, //ie '{teamId: 5}'
        className: PropTypes.string,
    };

    state = {activeTab: 0};

    buildUrlFromId(id) {
        //TODO pass this root as a prop
        const urlizer = pathToRegex.compile(this.props.basePath);
        const url = urlizer(this.props.pathParams || {});
        return `${url}/${id}`;
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
                        {tabs.map((tab, i) => {
                            let url = this.buildUrlFromId(tab.id);
                            return (
                                <Route key={i} path={url} component={() => tab.content} />
                            );
                        })}
                        <Redirect from={basePath} to={this.buildUrlFromId(tabs[0].id)} />
                    </Switch>
                </TabContent>
            </div>
        );
    }
}

export class Tabs extends React.Component {
    static propTypes = {
        tabs: PropTypes.arrayOf(PropTypes.shape({
            label: PropTypes.string.isRequired,
            content: PropTypes.element.isRequired,
        })),
        className: PropTypes.string,
    };

    state = {activeTab: 0};

    getActiveTab = () => {
        return R.is(Number, this.props.activeTab) ?
                          this.props.activeTab : this.state.activeTab;
    };

    toggle(tab) {
        const {setTab} = this.props;
        const activeTab = this.getActiveTab();

        if (activeTab !== tab) {
            if (setTab) {
                setTab(tab);
            } else {
                this.setState({
                    activeTab: tab
                });
            }
        }
    }

    render() {
        const {tabs} = this.props;
        const activeTab = this.getActiveTab();

        return (
            <div className={this.props.className + ' tab-wrapper'}>
                <Nav tabs>
                    {tabs.map((tab, i) => {
                        return (
                            <NavItem key={i}>
                                <NavLink
                                    className={activeTab === i ? "active" : ""}
                                    onClick={() => { this.toggle(i); }}
                                >
                                    {tab.label}
                                </NavLink>
                            </NavItem>
                        );
                    })}
                </Nav>
                <TabContent activeTab={activeTab}>
                    {tabs.map((tab, i) => {
                        return (
                            <TabPane key={i} tabId={i}>
                                {tab.content}
                            </TabPane>
                        );
                    })}
                </TabContent>
            </div>
        );
    }
}

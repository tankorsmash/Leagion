import PropTypes from 'prop-types';

import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';

export default class Tabs extends React.Component {
	static propTypes = {
		// each tab in the array contains:
		// -label
		// -content
		tabs: PropTypes.array.isRequired,
	};

    constructor(props) {
        super(props);

        this.state = {
            activeTab: 0,
        };
    }

	toggle(tab) {
		if (this.state.activeTab !== tab) {
			this.setState({
				activeTab: tab
			});
		}
	}

	render() {
		return (
			<div className={this.props.className + ' tab-wrapper'}>
				<Nav tabs>
					{this.props.tabs.map((tab, i) => {
						return (
							<NavItem key={i}>
								<NavLink
									className={this.state.activeTab === i ? "active" : ""}
									onClick={() => { this.toggle(i); }}
								>
									{tab.label}
								</NavLink>
							</NavItem>
						);
					})}
				</Nav>
				<TabContent activeTab={this.state.activeTab}>
					{this.props.tabs.map((tab, i) => {
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

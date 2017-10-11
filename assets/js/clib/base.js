import {Row, Col, Nav, NavLink, NavItem} from 'reactstrap';
import {ButtonComp} from 'clib/components/buttons';
import {DropdownComp} from 'clib/components/dropdowns';
import {TabComp, RoutedTabComp} from 'clib/components/tabs';

export default class Base extends React.Component {
    state = {selected: 0};

    components = [
        {'name': 'Buttons', 'components': [ButtonComp]},
        {'name': 'Dropdowns', 'components': [DropdownComp]},
        {'name': 'Tabs', 'components': [TabComp, RoutedTabComp]},
    ];

    selectComponent = (e) => {
        this.setState({
            selected: parseInt(e.currentTarget.dataset.i)
        });
    };

    render() {
        const selectedComponents = this.components[this.state.selected].components;

        return (
            <div className="component-library">
                <h4 className="clib-title">
                    Component Library
                </h4>
                <Row>
                    <Col sm="2">
                        <Nav pills vertical>
                            { this.components.map((tab, i) => {
                                if (tab.header) {
                                    return (
                                        <NavItem
                                            key={i}
                                            className="nav-header"
                                        >
                                            {tab.name}
                                        </NavItem>
                                    );
                                } else {
                                    return (
                                        <NavItem key={i} >
                                            <NavLink
                                                href="#"
                                                active={tab.components === selectedComponents}
                                                data-i={i}
                                                onClick={this.selectComponent}
                                            >
                                                {tab.name}
                                            </NavLink>
                                        </NavItem>
                                    );
                                }
                            })}
                        </Nav>
                    </Col>
                    <Col className="" sm="10">
                        {selectedComponents.map((Component, i) => {
                            return <Component key={i} />;
                        })}
                    </Col>
                </Row>
            </div>
        );
    }
}

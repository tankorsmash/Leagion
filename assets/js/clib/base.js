import {Row, Col, Nav, NavLink, NavItem} from 'reactstrap';
import {ButtonComp} from 'clib/components/buttons';

export default class Base extends React.Component {
    state = {selected: 1};

    components = [
        {'header': true, 'name': 'Elements'}, // header
        {'name': 'Buttons', 'components': [ButtonComp]},
        {'header': true, 'name': 'Components'}, // header
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

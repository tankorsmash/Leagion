import {BrowserRouter as Router} from 'react-router-dom';
import {Route} from 'components/router';
import {Row, Col, Nav, NavLink, NavItem} from 'reactstrap';
import {ButtonComp, LinkComp, ButtonLinkComp} from 'clib/components/buttons';
import {DropdownComp} from 'clib/components/dropdowns';
import {TabComp, RoutedTabComp} from 'clib/components/tabs';
import {SimpleModalComp} from 'clib/components/modals';
import {AvatarSelectorComp} from 'clib/components/files';
import {AvatarComp} from 'clib/components/media';
import {TitlebarComp, TextComp} from 'clib/components/text';
import {DatasetViewComp} from 'clib/components/no_ui';
import {TableComp, DraggableTableComp} from 'clib/components/tables';
import {FormComp, FormModalComp} from 'clib/components/forms';

class Clib extends React.Component {
    state = {selected: 0};

    components = [
        {'name': 'Buttons', 'components': [ButtonComp, LinkComp, ButtonLinkComp]},
        {'name': 'Dropdowns', 'components': [DropdownComp]},
        {'name': 'Text', 'components': [TitlebarComp, TextComp]},
        {'name': 'Tabs', 'components': [TabComp, RoutedTabComp]},
        {'name': 'Modals', 'components': [SimpleModalComp]},
        {'name': 'Forms', 'components': [FormComp, FormModalComp]},
        {'name': 'Tables', 'components': [TableComp, DraggableTableComp]},
        {'name': 'Files', 'components': [AvatarSelectorComp]},
        {'name': 'Media', 'components': [AvatarComp]},
        {'name': 'No Ui', 'components': [DatasetViewComp]},
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
                <h4 className="ml-2 clib-title">
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

export default class Base extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {

        return (
            <Router>
                <Route path={`/`} component={Clib} />
            </Router>
        );
    }
}


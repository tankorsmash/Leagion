import {
    Dropdown as RDropdown,
    NavDropdown as RNavDropdown,
    DropdownToggle as RDropdownToggle,
    DropdownMenu as RDropdownMenu,
    DropdownItem as RDropdownItem,
} from 'reactstrap';

import PropTypes from 'prop-types';

export const DropdownToggle = RDropdownToggle;
export const DropdownMenu = RDropdownMenu;
export const DropdownItem = RDropdownItem;

export class Dropdown extends React.Component {
    static propTypes = {
        caret: PropTypes.bool,
        color: PropTypes.string,
        menuRight: PropTypes.bool,
        buttonText: PropTypes.string,
        disabled: PropTypes.bool,
        dropup: PropTypes.bool,
        group: PropTypes.bool,
        nav: PropTypes.bool,
        children: PropTypes.node.isRequired,
        className: PropTypes.string,
    };

    state = {isOpen: false};

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    };

    render() {
        const {
            caret, disabled, color, dropup, group,
            menuRight, buttonText, children, nav,
            className,
        } = this.props;

        const Component = nav ? RNavDropdown : RDropdown;

        return (
            <Component
                className={className}
                isOpen={this.state.isOpen}
                toggle={this.toggle}
                dropup={dropup}
                group={group}
            >
                <DropdownToggle
                    caret={caret}
                    color={color}
                    disabled={disabled}
                    nav={nav}
                >
                    {buttonText}
                </DropdownToggle>
                <DropdownMenu right={menuRight}>
                    {children}
                </DropdownMenu>
            </Component>
        );
    }
}

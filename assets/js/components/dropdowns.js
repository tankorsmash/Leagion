import {
    Dropdown as RDropdown,
    NavDropdown as RNavDropdown,
    DropdownToggle as RDropdownToggle,
    DropdownMenu as RDropdownMenu,
    DropdownItem as RDropdownItem,
} from 'reactstrap';

import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';

export const DropdownToggle = RDropdownToggle;
export const DropdownMenu = RDropdownMenu;
export const DropdownItem = RDropdownItem;

export class Dropdown extends React.Component {
    static propTypes = {
        caret: PropTypes.bool,
        color: PropTypes.string,
        menuRight: PropTypes.bool,
        buttonText: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.element,
        ]),
        disabled: PropTypes.bool,
        dropup: PropTypes.bool,
        group: PropTypes.bool,
        nav: PropTypes.bool,
        children: PropTypes.node.isRequired,
        className: PropTypes.string,
        dotdotdot: PropTypes.bool,
    };

    state = {isOpen: false};

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    };

    render() {
        const {
            caret, disabled, dropup, group,
            menuRight, buttonText, children, nav,
            className, dotdotdot,
        } = this.props;

        const Component = nav ? RNavDropdown : RDropdown;

        const color = dotdotdot ? 'link' : this.props.color;
        const dotClass = dotdotdot ? 'le-ellipsis-button' : '';
        const classNames = `${className} ${dotClass}`;

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
                    className={classNames}
                >
                    {!dotdotdot && buttonText}
                    {dotdotdot && <FontAwesome name="ellipsis-h"/>}
                </DropdownToggle>
                <DropdownMenu right={menuRight}>
                    {children}
                </DropdownMenu>
            </Component>
        );
    }
}

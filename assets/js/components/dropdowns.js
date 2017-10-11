import {
    Dropdown as RDropdown,
    DropdownToggle as RDropdownToggle,
    DropdownMenu as RDropdownMenu,
    DropdownItem as RDropdownItem,
} from 'reactstrap';

import PropTypes from 'prop-types';

export const DropdownToggle = (props) => {
    return (
        <RDropdownToggle
            caret={props.caret}
            color={props.color}
            disabled={props.disabled}
        >
            {props.children}
        </RDropdownToggle>
    );
};

export const DropdownMenu = (props) => {
    return (
        <RDropdownMenu right={props.right}>
            {props.children}
        </RDropdownMenu>
    );
};

export const DropdownItem = (props) => {
    return (
        <RDropdownItem
            header={props.header}
            divider={props.divider}
            disabled={props.disabled}
        >
            {props.children}
        </RDropdownItem>
    );
};

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
        } = this.props;

        return (
            <RDropdown
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
            </RDropdown>
        );
    }
}

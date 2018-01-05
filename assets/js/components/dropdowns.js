import {
    Dropdown as RDropdown,
    DropdownToggle as RDropdownToggle,
    DropdownMenu as RDropdownMenu,
    DropdownItem as RDropdownItem,
} from 'reactstrap';

import {keyCodes} from 'common/utils';

import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';

export const DropdownToggle = RDropdownToggle;
export const DropdownMenu = RDropdownMenu;
export const DropdownItem = RDropdownItem;

// extended from reactstrap so we can include leaving the dropdown modal open if we
// click inside a modal
class ExtendedRDropdown extends RDropdown {
    handleDocumentClick(e) {
        if (e && (e.which === 3 || (e.type === 'keyup' && e.which !== keyCodes.tab))) return;
        const container = this.getContainer();

        if (container.contains(e.target) && container !== e.target && (e.type !== 'keyup' || e.which === keyCodes.tab)) {
            return;
        }

        if (
            e.target.classList.contains('modal') || e.target.closest('.modal') ||
            e.target.classList.contains('pac-container') || e.target.closest('.pac-container') ||
            e.target === document.querySelector('body')
        ) {
            return;
        }

        this.toggle(e);
    }
}

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


        const color = dotdotdot ? 'link' : this.props.color;
        const dotClass = dotdotdot ? 'le-ellipsis-button' : '';
        const classNames = `${className} ${dotClass}`;

        return (
            <ExtendedRDropdown
                className={className}
                isOpen={this.state.isOpen}
                toggle={this.toggle}
                dropup={dropup}
                group={group}
                nav={nav}
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
            </ExtendedRDropdown>
        );
    }
}

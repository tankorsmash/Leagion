import {Dropdown, DropdownItem} from 'components/dropdowns';
import {BaseComponent} from './base';

export class DropdownComp extends BaseComponent {
    static choiceAttrs = {
        color: [
            'primary', 'secondary', 'success',
            'info', 'warning', 'danger', 'link',
        ],
    };
    static defaultAttrs = {
        buttonText: 'Cool Button',
        caret: true,
    };
    static component = Dropdown;
    title = 'normal dropdown';

    renderCode() {
        return (
`import {Dropdown, DropdownItem} from 'components/dropdowns';

<Dropdown ${this.getAttrsAsCode()}>
    <DropdownItem header>Header</DropdownItem>
    <DropdownItem>Item 1</DropdownItem>
    <DropdownItem>Item 2</DropdownItem>
    <DropdownItem divider>Disabled item</DropdownItem>
    <DropdownItem disabled>Disabled item</DropdownItem>
</Dropdown>`
        );
    }

    renderComponent() {
        return (
            <Dropdown {...this.state}>
                <DropdownItem header>Header</DropdownItem>
                <DropdownItem>Item 1</DropdownItem>
                <DropdownItem>Item 2</DropdownItem>
                <DropdownItem divider>Disabled item</DropdownItem>
                <DropdownItem disabled>Disabled item</DropdownItem>
            </Dropdown>
        );
    }
}

export class EllipsisDropdownComp extends BaseComponent {
    static defaultAttrs = {
        dotdotdot: true,
    };
    static component = Dropdown;
    title = 'ellipsis dropdown';

    renderCode() {
        return (
`import {Dropdown, DropdownItem} from 'components/dropdowns';

<Dropdown ${this.getAttrsAsCode()}>
    <DropdownItem header>Header</DropdownItem>
    <DropdownItem>Item 1</DropdownItem>
    <DropdownItem>Item 2</DropdownItem>
    <DropdownItem divider>Disabled item</DropdownItem>
    <DropdownItem disabled>Disabled item</DropdownItem>
</Dropdown>`
        );
    }

    renderComponent() {
        return (
            <Dropdown {...this.state}>
                <DropdownItem header>Header</DropdownItem>
                <DropdownItem>Item 1</DropdownItem>
                <DropdownItem>Item 2</DropdownItem>
                <DropdownItem divider>Disabled item</DropdownItem>
                <DropdownItem disabled>Disabled item</DropdownItem>
            </Dropdown>
        );
    }
}

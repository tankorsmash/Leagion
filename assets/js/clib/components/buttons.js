import {Button} from 'components/buttons';
import BaseComponent from './base';

export class ButtonComp extends BaseComponent {
    static choice_attrs = {
        color: [
            'primary', 'secondary', 'success',
            'info', 'warning', 'danger', 'link',
        ],
        size: ['md', 'sm', 'lg'],
    };
    static component = Button;

    renderCode() {
        return `
import {Button} from 'components/buttons';
<Button ${this.getAttrsAsCode()}>
    Cool Button
</Button>`;
    }

    renderComponent() {
        return (
            <Button {...this.state}>Cool Button</Button>
        );
    }
}

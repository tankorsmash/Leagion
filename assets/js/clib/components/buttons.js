import { Button } from 'reactstrap';
import BaseComponent from './base';

export class ButtonComp extends BaseComponent {
    static required_attrs = {
        color: [
            'primary', 'secondary', 'success',
            'info', 'warning', 'danger', 'link',
        ],
        size: ['md', 'sm', 'lg'],
    };

    static optional_attrs = ['outline', 'block', 'active', 'disabled'];

    renderCode() {
        return (`
<Button ${this.getAttrsAsCode()}>Cool Button</Button>
        `);
    }

    renderComponent() {
        return (
            <Button {...this.state}>Cool Button</Button>
        );
    }
}

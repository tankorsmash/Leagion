import { Button } from 'reactstrap';
import BaseComponent from './base';

export class ButtonComp extends BaseComponent {
    static required_attrs = {
        color: [
            'primary', 'secondary', 'success',
            'info', 'warning', 'danger', 'link',
        ],
    };

    static optional_attrs = {
    };

    renderCode() {
        return (`
            <Button color="${this.state.color}">Cool Button</Button>
        `);
    }

    renderComponent() {
        return (
            <Button color={this.state.color}>Cool Button</Button>
        );
    }
}

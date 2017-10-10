import { Button } from 'reactstrap';
import BaseComponent from './base';

export class ButtonComp extends BaseComponent {
    static required_attrs = {
        color: [
            'primary', 'secondary', 'success',
            'info', 'warning', 'danger', 'link',
        ],
    };

    static optional_attrs = ['outline'];

    getAttrsAsCode() {
        let attrs = '';
        for (let attr in this.required_attrs) {
            attrs += `${attr}="${this.state[attr]}" `;
        }

        for (let attr of this.optional_attrs) {
            if (this.state[attr]) {
                attrs += `${attr} `;
            }
        }

        return attrs;
    }

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

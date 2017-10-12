import {SimpleModal} from 'components/modals';
import {BaseComponent} from './base';

export class SimpleModalComp extends BaseComponent {
    static component = SimpleModal;
    static defaultAttrs = {
        buttonText: 'Open Modal',
        title: 'Modal Title',
    };

    title = 'Simple Modal';
    description = 'This modal has built\
        in cancel and submit buttons and is triggered by a button.\
        Use the button component to style your button under buttonProps';

    renderCode() {
        return (
`import {SimpleModal} from 'components/modals';

<SimpleModal
    ${this.getAttrsAsCode()}
    body={<h2>this is the modal content</h2>}
/>`
        );
    }

    renderComponent() {
        return (
            <SimpleModal
                {...this.state}
                body={<h2>this is the modal content</h2>}
            />
        );
    }
}


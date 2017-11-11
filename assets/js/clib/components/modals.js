import {SimpleModal} from 'components/modals';
import {BaseComponent} from './base';
import {Button} from 'components/buttons';

export class SimpleModalComp extends BaseComponent {
    static component = SimpleModal;
    static choiceAttrs = {
        size: [undefined, 'sm', 'lg'],
    };
    static defaultAttrs = {
        title: 'Modal Title',
    };

    title = 'Simple Modal';
    description = 'This modal has built\
        in cancel and submit buttons and is triggered by a button.\
        Use the button component to style your button under buttonProps';

    renderCode() {
        return (
`import {SimpleModal} from 'components/modals';
import {Button} from 'components/buttons';

<SimpleModal
    ${this.getAttrsAsCode()}
    Opener={<Button>Modal Opener</Button>}
    body={<h2>this is the modal content</h2>}
    onSubmit={(e, toggle) => {
        toggle();
        console.log(e)}
    }
    onClose={() => {
        console.log('modal has closed')}
    }
/>`
        );
    }

    renderComponent() {
        return (
            <SimpleModal
                {...this.state}
                Opener={<Button>Modal Opener</Button>}
                body={<h2>this is the modal content</h2>}
                onSubmit={(e, toggle) => {
                    toggle();
                    console.log('handle modal submit here')}
                }
                onClose={() => {
                    console.log('modal has closed')}
                }
            />
        );
    }
}


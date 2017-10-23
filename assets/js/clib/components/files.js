import {AvatarSelector} from 'components/files';
import {BaseComponent} from './base';

export class AvatarSelectorComp extends BaseComponent {
    static component = AvatarSelector;
    static defaultAttrs = {
        dropzoneText: 'Drag and drop or click to upload file',
        title: 'Add an Cropped image',
        buttonText: 'Add an Avatar',
    };

    title = 'File Selector';

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
            <AvatarSelector
                {...this.state}
                onConfirm={(file) => console.log('File: ' + file, true)}
            />
        );
    }
}


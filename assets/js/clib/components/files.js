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
`import {AvatarSelector} from 'components/files';

<AvatarSelector
    ${this.getAttrsAsCode()}
    onConfirm={(file) => console.log('File: ' + file, true)}
/>
`
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


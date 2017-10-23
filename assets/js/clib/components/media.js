import {Avatar} from 'components/media';
import {BaseComponent} from './base';

export class AvatarComp extends BaseComponent {
    static component = Avatar;
    static choiceAttrs = {
        size: ['sm', 'md', 'lg'],
    };
    static defaultAttrs = {
        src: "https://avatars.io/static/default_256.jpg",
    };

    title = 'Avatar';
    description = 'Use this for displaying avatar type images';

    renderCode() {
        return (
`import {Avatar} from 'components/media';

<Avatar ${this.getAttrsAsCode()} />`
        );
    }

    renderComponent() {
        return (
            <Avatar
                {...this.state}
            />
        );
    }
}


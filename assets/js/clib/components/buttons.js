import {Button, Link} from 'components/buttons';
import {BaseComponent} from './base';
import urls from 'main/app/player/urls';

export class ButtonComp extends BaseComponent {
    title = 'Button';
    static choiceAttrs = {
        color: [
            'primary', 'secondary', 'success',
            'info', 'warning', 'danger', 'link',
        ],
        size: ['md', 'sm', 'lg'],
    };
    static component = Button;

    renderCode() {
        return (
`import {Button} from 'components/buttons';

<Button ${this.getAttrsAsCode()}>
    Cool Button
</Button>`
        );
    }

    renderComponent() {
        return (
            <Button {...this.state}>Cool Button</Button>
        );
    }
}

export class LinkComp extends BaseComponent {
    title = 'Link';
    description = 'pass in the url from the url\
    file and the args for the url';
    static ignoreAttrs = ['url', 'args'];
    static defaultAttrs = {
        text: 'Awesome Link',
    }
    static component = Link;

    renderCode() {
        return (
`
import {Link} from 'components/buttons';

<Link
    url={urls.profileDetail}
    args={{
        playerId: 1,
    }}
>
    ${this.state.text}
</Link>`
        );
    }

    renderComponent() {
        return (
            <Link
                url={urls.profileDetail}
                args={{
                    playerId:1,
                }}
            >
                {this.state.text}
            </Link>
        );
    }
}

export class ButtonLinkComp extends ButtonComp {
    title = 'Button Link';
    description = 'just pass a button into your link\
    to get a button that acts as a Router link!';

    renderCode() {
        return (
`import {Button, Link} from 'components/buttons';

<Link
    url={urls.profileDetail}
    args={{
        playerId:1,
    }}
>
    <Button ${this.getAttrsAsCode()}>
        Awesome Button Link
    </Button>
</Link>`
        );
    }

    renderComponent() {
        return (
            <Link
                url={urls.profileDetail}
                args={{
                    playerId:1,
                }}
            >
                <Button {...this.state}>
                    Awesome Button Link
                </Button>
            </Link>
        );
    }
}

import {Titlebar} from 'components/text';
import {BaseComponent} from './base';

export class TitlebarComp extends BaseComponent {
    static component = Titlebar;
    static defaultAttrs = {title: 'Good Title'};
    title = 'titlebar';

    renderCode() {
        return (
`
import {Titlebar} from 'components/text';

<Titlebar ${this.getAttrsAsCode()}/>;
`
        );
    }

    renderComponent() {
        return <Titlebar {...this.state}/>;
    }
}

export class TextComp extends BaseComponent {
    title = 'Text';

    renderCode() {
        return (
`
<div>
    <h1>Jumbo</h1>
    <h2>Display</h2>
    <h3>Headline</h3>
    <h4>Title</h4>
    <h5>Subheader</h5>
    <h6>Caption</h6>
    <p>Paragraph</p>
    <strong>Strong</strong>
    <small>Small</small>
</div>
`
        );
    }

    renderComponent() {
        return (
            <div>
                <h1>Jumbo</h1>
                <h2>Display</h2>
                <h3>Headline</h3>
                <h4>Title</h4>
                <h5>Subheader</h5>
                <h6>Caption</h6>
                <p>Paragraph</p>
                <strong>Strong</strong><br/>
                <small>Small</small>
            </div>
        );
    }
}

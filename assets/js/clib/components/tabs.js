import {Tabs, RoutedTabs} from 'components/tabs';
import {BaseComponent} from './base';

export class TabComp extends BaseComponent {
    static ignoreAttrs = ['basePath'];
    static component = Tabs;
    title = 'Basic Tabs';

    renderCode() {
        return (
`
import {Tabs} from 'components/tabs';

<Tabs
    ${this.getAttrsAsCode()}
    tabs={[{
        label: 'Tab 1',
        content: <h3>Tab 1 content</h3>
    }, {
        label: 'Tab 2',
        content: <h3>Tab 2 content</h3>
    }]}
/>
`
        );
    }

    renderComponent() {
        return (
            <Tabs
                tabs={[{
                    label: 'Tab 1',
                    content: <h3>Tab 1 content</h3>
                }, {
                    label: 'Tab 2',
                    content: <h3>Tab 2 content</h3>
                }]}
                {...this.state}
            />
        );
    }
}

export class RoutedTabComp extends BaseComponent {
    static ignoreAttrs = ['basePath'];
    static component = RoutedTabs;
    title = 'Routed Tabs';
    description = 'use these tabs to change the location of\
    the url depending on which tab is selected';

    renderCode() {
        return (
`
import {RoutedTabs} from 'components/tabs';

<Tabs
    ${this.getAttrsAsCode()}
    tabs={[{
        label: 'Tab 1',
        id: 'tab-1',
        content: <h3>Tab 1 content</h3>
    }, {
        label: 'Tab 2',
        id: 'tab-2',
        content: <h3>Tab 2 content</h3>
    }]}
    basePath={'clib'}
    pathParams={{}}
/>
`
        );
    }

    renderComponent() {
        return (
            <Tabs
                tabs={[{
                    label: 'Tab 1',
                    id: 'tab-1',
                    content: <h3>Tab 1 content</h3>
                }, {
                    label: 'Tab 2',
                    id: 'tab-2',
                    content: <h3>Tab 2 content</h3>
                }]}
                basePath={'clib'}
                pathParams={{}}
                {...this.state}
            />
        );
    }
}


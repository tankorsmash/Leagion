import {Table} from 'components/tables';
import {BaseComponent} from './base';

export class TableComp extends BaseComponent {
    static component = Table;
    static defaultAttrs = {
        responsive: true,
        striped: true,
    };
    title = 'Table';

    renderCode() {
        return (
`import {Table} from 'components/tables';

<Table
    ${this.getAttrsAsCode()}
    data={[
        {firstName: 'Bill', lastName: 'Sanchez'},
        {firstName: 'Tiger', lastName: 'Balmer'},
        {firstName: 'Carmen', lastName: 'Sandiego'},
        {firstName: 'Blaise', lastName: 'Pascal'},
    ]}
    columns={[
        {header: 'First Name', cell: 'firstName'},
        {header: 'First Name', cell: (item) => <small>item.lastName</small> },
    ]}
/>`
        );
    }

    renderComponent() {
        return (
            <Table
                {...this.state}
                data={[
                    {firstName: 'Bill', lastName: 'Sanchez'},
                    {firstName: 'Tiger', lastName: 'Balmer'},
                    {firstName: 'Carmen', lastName: 'Sandiego'},
                    {firstName: 'Blaise', lastName: 'Pascal'},
                ]}
                columns={[
                    {header: 'First Name', cell: 'firstName'},
                    {header: 'First Name', cell: (item) => <small>item.lastName</small> },
                ]}
            />
        );
    }
}

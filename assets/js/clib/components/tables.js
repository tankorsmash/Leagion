import {Table} from 'components/tables';
import {BaseComponent} from './base';

export class TableComp extends BaseComponent {
    static component = Table;
    static defaultAttrs = {
        responsive: true,
        striped: true,
    };
    static ignoreAttrs = ['draggable'];

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

export class DraggableTableComp extends BaseComponent {
    static component = Table;
    static defaultAttrs = {
        responsive: true,
        striped: true,
        draggable: true,
    };
    title = 'Draggable Table';
    description = 'use this kind of table if you want to be\
        able to change the order of items in the table.\
        The table data is self contained and passes the\
        updated data to onDrop(newData) after a drop.\
    ';

    renderCode() {
        return (
`import {Table} from 'components/tables';

<Table
    ${this.getAttrsAsCode()}
    draggable
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
    onDrop={(newData) => {
        console.log('newData', newData);
    }}
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
                onDrop={(newData) => {
                    console.log('newData', newData);
                }}
            />
        );
    }
}

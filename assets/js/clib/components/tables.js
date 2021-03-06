import {Table} from 'components/tables';
import {BaseComponent} from './base';
import {Dropdown, DropdownItem} from 'components/dropdowns';

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

export class RowSelectTableComp extends BaseComponent {
    static component = Table;
    static defaultAttrs = {
        responsive: true,
        striped: true,
    };
    static ignoreAttrs = ['draggable'];

    title = 'Row Selections in Table';

    renderCode() {
        return (
`import {Table} from 'components/tables';

<Table
    ${this.getAttrsAsCode()}
    onRowSelect={(selectedRows) => {console.log(selectedRows)}}
    data={[
        {id: 3, firstName: 'Bill', lastName: 'Sanchez'},
        {id: 5, firstName: 'Tiger', lastName: 'Balmer'},
        {id: 6, firstName: 'Carmen', lastName: 'Sandiego'},
        {id: 9, firstName: 'Blaise', lastName: 'Pascal'},
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
                onRowSelect={(selectedRows) => {console.log(selectedRows)}}
                data={[
                    {id: 3, firstName: 'Bill', lastName: 'Sanchez'},
                    {id: 5, firstName: 'Tiger', lastName: 'Balmer'},
                    {id: 6, firstName: 'Carmen', lastName: 'Sandiego'},
                    {id: 9, firstName: 'Blaise', lastName: 'Pascal'},
                ]}
                columns={[
                    {header: 'First Name', cell: 'firstName'},
                    {header: 'First Name', cell: (item) => <small>item.lastName</small> },
                ]}
            />
        );
    }
}

export class ActionColumnTableComp extends BaseComponent {
    static component = Table;
    static defaultAttrs = {
        responsive: true,
        striped: true,
    };
    static ignoreAttrs = ['draggable'];

    title = 'Action Columns in Table';

    renderCode() {
        return (
`import {Table} from 'components/tables';

<Table
    ${this.getAttrsAsCode()}
    data={[
        {id: 3, firstName: 'Bill', lastName: 'Sanchez'},
        {id: 5, firstName: 'Tiger', lastName: 'Balmer'},
    ]}
    columns={[
        {header: 'First Name', cell: 'firstName'},
        {header: 'First Name', cell: (item) => <small>item.lastName</small> },
        {cell: (item) => {
            return (
                <Dropdown dotdotdot >
                    <DropdownItem
                        onClick={() => {console.log(item.firstName + " is cool");}}
                    > make cool </DropdownItem>
                </Dropdown>
            );
        }},
    ]}
/>`
        );
    }

    renderComponent() {
        return (
            <Table
                {...this.state}
                data={[
                    {id: 3, firstName: 'Bill', lastName: 'Sanchez'},
                    {id: 5, firstName: 'Tiger', lastName: 'Balmer'},
                ]}
                columns={[
                    {header: 'First Name', cell: 'firstName'},
                    {header: 'First Name', cell: (item) => <small>item.lastName</small> },
                    {cell: (item) => {
                        return (
                            <Dropdown dotdotdot >
                                <DropdownItem
                                    onClick={() => {console.log(item.firstName + " is cool");}}
                                > make cool </DropdownItem>
                            </Dropdown>
                        );
                    }},
                ]}
            />
        );
    }
}

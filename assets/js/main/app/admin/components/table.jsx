import { Table } from 'reactstrap';

class TableHead extends React.Component {
    render() {
        return (
            <thead>
                <tr>
                    {
                        this.props.columns.map((column, i) => {
                            return (<th key={i+1}> {column.title} </th>);
                        })
                    }
                </tr>
            </thead>
        );
    };
}

class TableCell extends React.Component {
    render() {
        const column = this.props.column;
        const rowData = this.props.rowData;

        //if there's a component to render, use that, otherwise build a plain <td>
        if (column.component) {
            const CellComponent = column.component;
            return (
                <CellComponent data={rowData} />
            );
        } else {
            return (
                <td> {rowData[column.id]} </td>
            );
        };
    };
}


class TableRow extends React.Component {
    render() {
        return (
            <tr>
                {
                    this.props.columns.map((column, i) => {
                        return (<TableCell key={i} column={column} rowData={this.props.rowData} />);
                    })
                }
            </tr>
        );
    }
}

class TableBody extends React.Component {
    render() {
        const rowData = this.props.rowData;
        const columns = this.props.columns;

        return (
            <tbody>
                {
                    rowData.map((row, i) => {
                        return (
                            <TableRow key={i} columns={columns} rowData={row}/>
                        );
                    })
                }
            </tbody>
        );
    }
}

export class GeneralTable extends React.Component {
    render() {
        const rowData = this.props.rowData;
        const columns = this.props.columns;

        return (
            <Table striped>
                <TableHead columns={columns}/>
                <TableBody columns={columns} rowData={rowData} />
            </Table>
        );
    };
};

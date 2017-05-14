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
        const contextData = this.props.contextData;
        return (
            <tr>
                {
                    this.props.columns.map((column, i) => {
                        return (<TableCell key={i} contextData={contextData} column={column} rowData={this.props.rowData} />);
                    })
                }
            </tr>
        );
    }
}

class TableBody extends React.Component {
    static defaultProps = {
        "rowData": [],
        "columns": [],
    }

    render() {
        const rowData = this.props.rowData;
        const columns = this.props.columns;
        const contextData = this.props.contextData;

        if (rowData.length == 0) {
            let emptyPlaceholder = [];
            for (let col of columns) {
                emptyPlaceholder.push(
                    <td key={col.id}>
                        <span className="text-muted">&nbsp;</span>
                    </td>
                );
            }

            return <tbody><tr>{emptyPlaceholder}</tr></tbody>;
        }

        return (
            <tbody>
                {
                    rowData.map((row, i) => {
                        return (
                            <TableRow key={i} contextData={contextData} columns={columns} rowData={row}/>
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
        const contextData = this.props.contextData;

        return (
            <Table hover striped>
                <TableHead columns={columns}/>
                <TableBody contextData={contextData} columns={columns} rowData={rowData} />
            </Table>
        );
    };
};

import {
    Container, Row, Col, Jumbotron, Button,
    Card, CardImg, CardText, CardBlock, CardTitle, CardSubtitle,
    Nav, NavLink, NavItem, Table
} from 'reactstrap';

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

class TableRow extends React.Component {
    renderCell(index, column, rowData) {
        //if there's a component to render, use that, otherwise build a plain <td>
        if (column.component) {
            const CellComponent = column.component;
            return (
                <CellComponent key={index} data={rowData} />
            );
        } else {
            return (
                <td key={index}> {rowData[column.id]} </td>
            );
        };
    }

    render() {
        return (
            <tr>
                {
                    this.props.columns.map((column, i) => {
                        return this.renderCell(i, column, this.props.rowData);
                    })
                }
            </tr>
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
                <tbody>
                    {
                        rowData.map((row, i) => {
                            return (
                                <TableRow key={i} columns={columns} rowData={row}/>
                            );
                        })
                    }
                </tbody>
            </Table>
        );
    };
};

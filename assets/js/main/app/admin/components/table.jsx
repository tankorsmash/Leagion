import { Table, Row, Col, Button } from 'reactstrap';

const range = (start, end) => Array.from({length: (end - start)}, (v, k) => k + start);

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
        const contextData = this.props.contextData;

        //if there's a component to render, use that, otherwise build a plain <td>
        if (column.component) {
            const CellComponent = column.component;
            return (
                <CellComponent contextData={contextData} data={rowData} />
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
    static defaultProps = {
        perPage: 5,
    }

    constructor(props) {
        super(props);

        this.state = {
            curIndex: 0,
        }
    }

    nextPage = (e) => {
        this.setState({
            curIndex: this.state.curIndex+this.props.perPage
        });
    }

    prevPage = (e) => {
        this.setState({
            curIndex: this.state.curIndex-this.props.perPage
        });
    }

    render() {
        const rowData = this.props.rowData;
        const columns = this.props.columns;
        const contextData = this.props.contextData;

        let displayedRows = rowData.slice(
            this.state.curIndex,
            this.state.curIndex+this.props.perPage,
        );

        const totalPages = rowData.length/this.props.perPage;
        const currentPageIndex = this.state.curIndex / this.props.perPage;

        return (
            <div>
                <Row>
                    <Col>
                        <Table hover striped>
                            <TableHead columns={columns}/>
                            <TableBody contextData={contextData} columns={columns} rowData={displayedRows} />
                        </Table>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Button
                            className={ currentPageIndex > 0 ? undefined :  "invisible" }
                            color="primary" onClick={this.prevPage}>
                            Prev
                        </Button>

                        { range(0, totalPages+1).map((pageNum) => {
                            return (
                                <Button
                                    key={pageNum}
                                    color={ pageNum == currentPageIndex ? "active" : undefined}
                                    onClick={ (e) => this.setState({curIndex: pageNum*this.props.perPage})} >
                                    {pageNum+1}
                                </Button>
                            );
                        })}

                        <Button
                            className={currentPageIndex+1 <= totalPages ? undefined : "invisible" }
                            color="primary" onClick={this.nextPage}>
                            Next
                        </Button>
                    </Col>
                </Row>
            </div>
        );
    };
};

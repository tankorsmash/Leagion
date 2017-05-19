import { Table, Row, Col, Button } from 'reactstrap';
import PropTypes from 'prop-types';

const range = (start, end) => Array.from({length: (end - start)}, (v, k) => k + start);

function stringCompare(left, right) {
    return left.localeCompare(right);
};

function numberCompare(left, right) {
    return left - right;
};

function getCompareFunc(data) {
    let compareFunc = null;

    if (typeof(data) == "string") {
        compareFunc = stringCompare;
    } else if (typeof(data) == "number") {
        compareFunc = numberCompare;
    };

    return compareFunc;
};

class TableControls extends React.Component {
    render() {
        return (
            <Row>
                <Col className="d-flex justify-content-center">
                    <Button
                        className={ this.props.currentPageIndex > 0 ? undefined :  "invisible" }
                        color="primary"
                        onClick={this.props.prevPageHandler}
                    > Prev </Button>

                { range(0, this.props.totalPages+1).map((pageNum) => {
                    return (
                        <Button
                            key={pageNum}
                            color={ pageNum == this.props.currentPageIndex ? "active" : undefined}
                            onClick={(e) => this.props.setCurrentOffsetHandler(pageNum*this.props.perPage)} >
                            {pageNum+1}
                        </Button>
                    );
                })}

                <Button
                    className={ this.props.currentPageIndex < this.props.totalPages-1 ? undefined : "invisible" }
                    color="primary"
                    onClick={this.props.nextPageHandler}
                > Next </Button>
            </Col>
        </Row>
        );
    }

}

class TableHead extends React.Component {
    render() {
        return (
            <thead>
                <tr>
                    {
                        this.props.columns.map((column, i) => {
                            return (
                                <th
                                    key={i+1}
                                    onClick={ (e) => {this.props.setSortKey(column.id);} }
                                > {column.title} </th>);
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
        perPage: 25,
    }
    static propTypes = {
        perPage: PropTypes.number,
    }

    constructor(props) {
        super(props);

        this.state = {
            currentOffset: 0,
            sortKey: undefined,
        }
    }

    nextPage = (e) => {
        this.setCurrentOffset(this.state.currentOffset+this.props.perPage);
    }

    prevPage = (e) => {
        this.setCurrentOffset(this.state.currentOffset-this.props.perPage);
    }

    setCurrentOffset = (newOffset) => {
        this.setState({currentOffset: newOffset});
    }

    setSortKey = (newKey) => {
        this.setState({sortKey: newKey});
    }

    getSortedRowData = () => {
        const sortKey = this.state.sortKey;
        const rowData = this.props.rowData;

        if (sortKey == undefined || this.props.rowData.length == 0) {
            return rowData;
        };


        let compareFunc = getCompareFunc(rowData[0][sortKey]);
        if (compareFunc == null) {
            console.error("invalid sort type for sortKey: ", sortKey);
            return rowData;
        };

        return this.props.rowData.sort((left, right) => {
            const leftVal = left[sortKey];
            const rightVal = right[sortKey];

            return compareFunc(leftVal, rightVal);
        });
    }

    render() {
        const rowData = this.getSortedRowData();

        const contextData = this.props.contextData;

        let displayedRows = rowData.slice(
            this.state.currentOffset,
            this.state.currentOffset+this.props.perPage,
        );

        const totalPages = (rowData.length-1)/this.props.perPage;
        const currentPageIndex = this.state.currentOffset / this.props.perPage;

        return (
            <div>
                <Row>
                    <Col>
                        <Table hover striped>
                            <TableHead setSortKey={this.setSortKey} columns={this.props.columns}/>
                            <TableBody contextData={contextData} columns={this.props.columns} rowData={displayedRows} />
                        </Table>
                    </Col>
                </Row>

                { totalPages > 1 &&
                <TableControls
                    currentPageIndex={currentPageIndex}
                    totalPages={totalPages}
                    perPage={this.props.perPage}
                    setCurrentOffsetHandler={this.setCurrentOffset}
                    nextPageHandler={this.nextPage}
                    prevPageHandler={this.prevPage}
                /> }

            </div>
        );
    };
};

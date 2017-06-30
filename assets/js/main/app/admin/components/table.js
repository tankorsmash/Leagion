import { Table, Row, Col, Button } from 'reactstrap';
import PropTypes from 'prop-types';

import FontAwesome from 'react-fontawesome';

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
                <Col className="d-flex flex-wrap justify-content-center">
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

class TableHeadSortIcon extends React.Component {
    static propTypes = {
        columnId: PropTypes.string,
    }

    static defaultProps = {
        sortKey: undefined,
        sortReversed: false,
    }

    render() {
        if (this.props.sortKey != this.props.columnId) {
            return <i/>;
        }

        if (this.props.sortReversed == false) {
            return <FontAwesome className={this.props.className} name="sort-asc"/>;
        } else {
            return <FontAwesome className={this.props.className} name="sort-desc"/>;
        }
    };
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
                                    className="text-nowrap"
                                    key={i+1}
                                    onClick={(e) => {this.props.onHeaderClick(e, column.id);}}>

                                    <a style={{color: "inherit"}} href="#">
                                        {column.title}

                                        <TableHeadSortIcon
                                            className="pl-1"
                                            sortKey={this.props.sortKey}
                                            sortReversed={this.props.sortReversed}
                                            columnId={column.id}
                                        />
                                    </a>
                                </th>
                            );
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
            sortReversed: false,
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

    onHeaderClick = (e, newKey) => {
        //handle three states, unsorted -> sorted -> sort reversed -> unsorted
        if (this.state.sortKey != newKey) {
            this.setSortKey(newKey);
            this.setState({sortReversed: false});
        } else if (this.state.sortReversed == false) {
            this.setState({sortReversed: true});
        } else if (this.state.sortReversed == true) {
            this.setSortKey(undefined);
            this.setState({sortReversed: false});
        }

    };

    setSortKey = (newKey) => {
        this.setState({sortKey: newKey});
    }

    getSortedRowData = () => {
        const sortKey = this.state.sortKey;
        let rowData = this.props.rowData.slice(); //slice so you copy and dont mutate props.rowData

        //fallback to default order
        if (sortKey == undefined || this.props.rowData.length == 0) {
            return rowData;
        };

        let filterOnEntireRow = false;

        //find the appropriate sort type, ie string or number compare, or use column.compareFunc
        const firstRow = rowData[0];
        let compareFunc = getCompareFunc(firstRow[sortKey]);

        //if not found, look in column to see if compareFunc is defined
        if (compareFunc == null) {
            const column = this.props.columns.filter(col => col.id == sortKey)[0];
            if (column && column.component.compareFunc != undefined) {
                compareFunc = column.component.compareFunc;
                filterOnEntireRow = true;
            } else {
                console.warn(`invalid sort type for sortKey: '${sortKey}' or missing column.component.compareFunc!`);
                return rowData;
            }
        };

        let finalCompareFunc = compareFunc; //have to make a new var, otherwise it recurses in this arrow func
        if (this.state.sortReversed) {
            finalCompareFunc = (left, right) => { return -1*compareFunc(left, right); };
        };

        //return data sorted by...
        if (filterOnEntireRow == false) {
            //... comparing a column
            return rowData.sort((leftRow, rightRow) => {
                return finalCompareFunc(leftRow[sortKey], rightRow[sortKey]);
            });
        } else {
            //... comparing the entire row
            return rowData.sort((leftRow, rightRow) => {
                return finalCompareFunc(leftRow, rightRow);
            });
        }

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
            <div className={`pt-2 ${this.props.className}`}>
                <Row>
                    <Col>
                        <Table hover striped>
                            <TableHead
                                onHeaderClick={this.onHeaderClick}
                                columns={this.props.columns}
                                sortKey={this.state.sortKey}
                                sortReversed={this.state.sortReversed}
                            />

                            <TableBody
                                contextData={contextData}
                                columns={this.props.columns}
                                rowData={displayedRows} />
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

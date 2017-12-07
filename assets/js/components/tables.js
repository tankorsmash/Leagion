import {Table as RTable, Row, Col } from 'reactstrap';
import PropTypes from 'prop-types';
import Dragula from 'react-dragula';
import update from 'immutability-helper';

import {Input} from 'components/forms';
import {SearchInput} from 'components/forms';
import {LeftRight} from 'components/misc';
import DatasetView from 'components/DatasetView';
import {Button} from 'components/buttons';

export class Table extends React.Component {
    static propTypes = {
        columns: PropTypes.array,
        data: PropTypes.array,
        responsive: PropTypes.bool,
        striped: PropTypes.bool,
        hover: PropTypes.bool,
        bordered: PropTypes.bool,
        small: PropTypes.bool,
        inverse: PropTypes.bool,
        className: PropTypes.string,
        draggable: PropTypes.bool,
        onRowSelect: PropTypes.func,
        emptyEl: PropTypes.element,
        onDrop: function(props, propName, componentName) {
            if (
                (props['draggable'] == true &&
                    (
                        props[propName] == undefined ||
                        typeof(props[propName]) != 'function'
                    )
                )
            ) {
                return new Error(`In component ${componentName}:
                    if draggable, then ${propName} function must also
                    be passed in`);
            }
        },
    };

    state = {
        data: this.props.data,
        selectedRows: [],
        selectedIds: [],
    };

    setRefresh = (refresh) => {this.setState({refresh: refresh});};
    setSearch = (search) => {this.setState({search: search});};

    componentWillReceiveProps(nextProps) {
        if (nextProps.data !== this.state.data) {
            this.setState({data: nextProps.data});
        }
    }

    componentDidMount() {
        if (this.props.draggable && !this.drake) {
            this.drake = Dragula([this.tbody], {
                moves: function (el, source, handle) {
                    return handle.dataset.draggableHandle; // elements are always draggable by default
                },
            })
                .on('drop', this.onDrop)
                .on('drag', (el, source) => {
                    this.oldIndex = Array.prototype.indexOf.call(source.children, el);
                    document.addEventListener('touchstart', this.stopScrolling);
                });
        }
    }

    componentWillUnmount() {
        this.drake = undefined;
    }

    // On mobile this prevents the default page scrolling while dragging an item.
    stopScrolling(e) {
        e.preventDefault();
    }

    onDrop = (el, source) => {
        const newIndex = Array.prototype.indexOf.call(source.children, el);
        const obj = this.state.data[this.oldIndex];

        this.setState((prevState) => {
            return update(prevState, {data: {
                $splice: [
                    [this.oldIndex, 1],
                    [newIndex, 0, obj]
                ]
            }});
        });

        this.drake.cancel(true);

        this.props.onDrop(this.state.data);
    };

    // adds a handle to drag the cells if this is a draggable table
    addDraggableColumn(columns) {
        if (this.props.draggable) {
            return columns.concat([
                {header: '', cell: () => {
                    return (
                        <i
                            data-draggable-handle={true}
                            className="fa fa-arrows"
                            aria-hidden="true"
                        >
                        </i>
                    );
                }},
            ]);
        } else {
            return columns;
        }
    }

    toggleRow = i => {
        const {selectedRows, selectedIds, data} = this.state;
        let srows;
        let sids;

        if (selectedRows.includes(i)) {
            sids = selectedIds.filter(row => row !== data[i].id);
            srows = selectedRows.filter(row => row !== i);
        } else {
            sids = selectedIds.concat(data[i].id);
            srows = selectedRows.concat(i);
        }

        this.setState({
            selectedRows: srows,
            selectedIds: sids,
        });
        this.selectRows(sids);
    };

    toggleAllRows = () => {
        const {selectedRows, data} = this.state;
        let srows;
        let sids;

        if (selectedRows.length === data.length) {
            srows = [];
            sids = [];
        } else {
            sids = data.map((row) => row.id);
            srows = data.map((row, i) => i);
        }

        this.setState({
            selectedRows: srows,
            selectedIds: sids,
        });
        this.selectRows(sids);
    };

    selectRows = (sids) => {
        this.props.onRowSelect(sids);
    };

    render() {
        const {
            striped, hover, bordered, inverse, className,
            onRowSelect, emptyEl
        } = this.props;

        const {data, selectedRows} = this.state;
        const size = this.props.small ? 'sm' : undefined;
        const responsive = this.props.responsive || true;

        const columns = this.addDraggableColumn(this.props.columns);

        if (!data.length) {
            return emptyEl;
        }

        return (
            <RTable
                className={"leagion-table " + className}
                responsive={responsive}
                striped={striped}
                hover={hover}
                size={size}
                bordered={bordered}
                inverse={inverse}
            >
                <thead ref={(el) => {this.thead=el;}}>
                    <tr>
                        {onRowSelect &&
                            <th className="le-select-all-rows">
                                <Input
                                    type="checkbox"
                                    onClick={this.toggleAllRows}
                                    checked={selectedRows.length === data.length}
                                    indeterminate={selectedRows.length && selectedRows.length < data.length}
                                />
                            </th>
                        }
                        {columns.map((column, i) => {
                            return <th key={i}>{column.header}</th>;
                        })}
                    </tr>
                </thead>
                <tbody ref={(el) => {this.tbody=el;}}>
                    {data.map((item, i) => {
                        return (
                            <tr key={i}>
                                {onRowSelect &&
                                    <td>
                                        <Input
                                            type="checkbox"
                                            onClick={() => {this.toggleRow(i);}}
                                            checked={selectedRows.includes(i)}
                                        />
                                    </td>
                                }
                                {columns.map((column, j) => {
                                    let cell;
                                    if (typeof(column.cell) === 'function') {
                                        cell = column.cell(item, i);
                                    } else {
                                        cell = item[column.cell];
                                    }

                                    return (
                                        <td key={j}>{cell}</td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </RTable>
        );
    }
}

const TableControls = ({page, pageCount, setNewPage}) => {
    return (
        <Row>
            <Col className="d-flex flex-wrap justify-content-center">
                <Button
                    style={{ visibility: page === 1 ? 'hidden' : 'visible' }}
                    color="link" onClick={() => setNewPage(1)}
                >
                    First
                </Button>

                { Array.apply(null, {length: pageCount}).map((dummy, i) => {
                    const num = i + 1;
                    if (pageCount === 1) {
                        return null;
                    }
                    return (
                        <Button
                            key={num}
                            color={ page === num ? "primary" : "link"}
                            onClick={() => {
                                if (page !== num) {
                                    setNewPage(num);
                                }
                            }}
                        >
                            {num}
                        </Button>
                    );
                })}

                <Button
                    style={{ visibility: page === pageCount ? 'hidden' : 'visible' }}
                    color="link" onClick={() => setNewPage(pageCount)}
                >
                    Last
                </Button>
            </Col>
        </Row>
    );

};

export class DataTable extends React.Component {
    static propTypes = {
        tableProps: PropTypes.object.isRequired,
        url: PropTypes.string.isRequired,
        toolbar: PropTypes.element,
        onDrop: function(props, propName, componentName) {
            if (
                (props['draggable'] == true &&
                    (
                        props[propName] == undefined ||
                        typeof(props[propName]) != 'function'
                    )
                )
            ) {
                return new Error(`In component ${componentName}:
                    if draggable, then ${propName} function must also
                    be passed in`);
            }
        },
    };

    state = {
        data: null,
        search: '',
        refresh: false,
        page: 1,
        count: 0,
        page_size: 10,
    };

    setRefresh = (refresh) => {this.setState({refresh: refresh});};
    setSearch = (search) => {
        this.setState({
            search: search,
            page: 1,
        });
    };

    render() {
        const {
            toolbarLeft, toolbarRight, url, tableProps,
            params, emptySearchEl
        } = this.props;

        const {data, search, refresh, page, page_size, count} = this.state;

        const noData = data && !data.length && !search;
        const noSearchMatch = data && !data.length && search;
        const showTable = !!data;

        params.page_size = page_size;
        params.page = page;

        return (
            <DatasetView
                url={url}
                data={params} search={search}
                refresh={refresh} setRefresh={this.setRefresh}
                onSuccess={(newData) => {
                    this.setState({
                        data: newData.results,
                        count: newData.count,
                    });
                }}
            >
                {!noData &&
                    <LeftRight className="mb-3"
                        left={toolbarLeft}
                        right={(
                            <div className="d-flex flex-row-reverse">
                                <SearchInput
                                    setSearch={this.setSearch}
                                    search={search}
                                />
                                {toolbarRight}
                            </div>
                        )}
                    />
                }
                { showTable && !noSearchMatch && (
                    <Table
                        data={data}
                        {...tableProps}
                    />
                )}
                { showTable && !!count &&
                    <TableControls
                        page={page}
                        pageCount={Math.ceil(count / page_size)}
                        setNewPage={(pageNum) => {
                            this.setState({
                                page: pageNum,
                                refresh: true,
                            });

                        }}
                    />
                }
                { noSearchMatch && emptySearchEl }
            </DatasetView>
        );
    }
}

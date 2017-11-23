import {Table as RTable } from 'reactstrap';
import PropTypes from 'prop-types';
import Dragula from 'react-dragula';
import update from 'immutability-helper';
import {Input} from 'components/forms';

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
    };

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
        const {selectedRows} = this.state;

        if (selectedRows.includes(i)) {
            this.setState({
                selectedRows: selectedRows.filter(row => row !== i)
            });
        } else {
            this.setState({selectedRows: selectedRows.concat(i)});
        }

    };

    toggleAllRows = () => {
        const {selectedRows, data} = this.state;

        if (selectedRows.length === data.length) {
            this.setState({selectedRows: []});
        } else {
            this.setState({
                selectedRows: data.map((row, i) => i)
            });
        }

    };

    render() {
        const {
            striped, hover, bordered, inverse, className,
            onRowSelect,
        } = this.props;

        const {data, selectedRows} = this.state;
        const size = this.props.small ? 'sm' : undefined;
        const responsive = this.props.responsive || true;

        const columns = this.addDraggableColumn(this.props.columns);

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

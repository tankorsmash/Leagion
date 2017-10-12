import { ListGroup, ListGroupItem, Table as RTable } from 'reactstrap';
import PropTypes from 'prop-types';

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
    };

    render() {
        const { columns, data, striped, hover, bordered, inverse } = this.props;
        const size = this.props.small ? 'sm' : undefined;
        const responsive = this.props.responsive || true;

        return (
            <RTable
                className="leagion-table"
                responsive={responsive}
                striped={striped}
                hover={hover}
                size={size}
                bordered={bordered}
                inverse={inverse}
            >
                <thead>
                    <tr>
                        {columns.map((column, i) => {
                            return <th key={i}>{column.header}</th>;
                        })}
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, i) => {
                        return (
                            <tr key={i}>
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


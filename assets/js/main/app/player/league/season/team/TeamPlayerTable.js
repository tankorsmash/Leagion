import {Table} from 'components/tables';

export const TeamPlayerTable = (props) => {
    return (
        <Table responsive striped
            data={props.players}
            columns={[
                {header: 'Name', cell: 'full_name'},
                {header: 'Email', cell: 'email'},
            ]}
        />
    );
};

import {compose, setDisplayName, withState } from 'recompose';

import {Dropdown, DropdownItem} from 'components/dropdowns';
import {DataTable} from 'components/tables';
import {NoDataCard} from 'components/cards';

//import TeamCreateModal from './TeamCreateModal';

const enhance = compose(
    withState('selectedIds', 'setSelectedIds', []),
    setDisplayName('TeamTable'),
);
export default enhance(({season, setRefresh, selectedIds, setSelectedIds}) => {
    return (
        <DataTable
            url={reverse('api-my-comm-location-list')}
            params={{league: season.league}}
            emptySearchEl={
                <NoDataCard>
                    <p>{ "No locations match your search criteria" }</p>
                </NoDataCard>
            }
            tableProps={{
                onRowSelect: setSelectedIds,
                responsive: true,
                striped: true,
                emptyEl: (
                    <NoDataCard>
                        <p>{"It looks like you don't have any locations in this league yet. Create one to get started!"}</p>
                        {/*
                        <TeamCreateModal season={season} onSuccess={() =>{setRefresh(true);}}/>
                        */}
                    </NoDataCard>
                ),
                columns: [
                    {header: 'Name', cell: 'name'},
                    {header: 'Address', cell: 'address'},
                    {cell: (item) => {
                        return (
                            <Dropdown menuRight dotdotdot >
                                {/*
                                <TeamEditModal
                                    team={item} onSuccess={() =>{setRefresh(true);}}
                                    Opener={<DropdownItem toggle={false}>{'Rename'}</DropdownItem>}
                                />
                                */}
                            </Dropdown>
                        );
                    }},
                ],
            }}
        />
    );
});


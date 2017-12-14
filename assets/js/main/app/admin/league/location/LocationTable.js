import {compose, setDisplayName, withState } from 'recompose';

import {Dropdown, DropdownItem} from 'components/dropdowns';
import {DataTable} from 'components/tables';
import {NoDataCard} from 'components/cards';

import LocationCreateModal from './LocationCreateModal';
import LocationDeleteModal from './LocationDeleteModal';
import LocationDeleteManyModal from './LocationDeleteManyModal';
import LocationEditModal from './LocationEditModal';

const enhance = compose(
    withState('selectedIds', 'setSelectedIds', []),
    setDisplayName('TeamTable'),
);
export default enhance(({season, setRefresh, selectedIds, setSelectedIds}) => {
    return (
        <DataTable
            url={reverse('api-my-comm-location-list')}
            params={{league: season.league.id}}
            toolbar={[
                <Dropdown
                    key="dropdown"
                    disabled={!selectedIds.length}
                    color="info"
                    buttonText="..."
                >
                    <LocationDeleteManyModal
                        ids={selectedIds}
                        Opener={<DropdownItem toggle={false}>Delete</DropdownItem>}
                        onSuccess={() =>{setRefresh(true);}}
                    />
                </Dropdown>,
                <LocationCreateModal key="create" season={season} onSuccess={() =>{setRefresh(true);}}/>
            ]}
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
                        <LocationCreateModal season={season} onSuccess={() =>{setRefresh(true);}}/>
                    </NoDataCard>
                ),
                columns: [
                    {header: 'Name', cell: 'name'},
                    {header: 'Address', cell: 'address'},
                    {cell: (item) => {
                        return (
                            <Dropdown menuRight dotdotdot >
                                <LocationEditModal
                                    location={item} season={season} onSuccess={() =>{setRefresh(true);}}
                                    Opener={<DropdownItem toggle={false}>{'Edit'}</DropdownItem>}
                                />
                                <LocationDeleteModal
                                    location={item} onSuccess={() =>{setRefresh(true);}}
                                    Opener={<DropdownItem toggle={false}>{'Delete'}</DropdownItem>}
                                />
                            </Dropdown>
                        );
                    }},
                ],
            }}
        />
    );
});


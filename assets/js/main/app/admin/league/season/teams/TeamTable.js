import {compose, setDisplayName, withState } from 'recompose';

import {Dropdown, DropdownItem} from 'components/dropdowns';
import {DataTable} from 'components/tables';
import {NoDataCard} from 'components/cards';

import TeamCreateModal from './TeamCreateModal';
import TeamEditModal from './TeamEditModal';
import TeamDeleteManyModal from './TeamDeleteManyModal';

const enhance = compose(
    withState('selectedIds', 'setSelectedIds', []),
    setDisplayName('TeamTable'),
);
export default enhance(({season, setRefresh, selectedIds, setSelectedIds}) => {
    return (
        <div>
            <DataTable
                url={reverse('api-my-comm-team-list')}
                params={{season: season.id}}
                toolbarLeft={(
                    <div className="d-flex">
                        <Dropdown
                            disabled={!selectedIds.length}
                            className="mr-1"
                            color="info"
                            buttonText="..."
                        >
                            <TeamDeleteManyModal
                                ids={selectedIds}
                                Opener={<DropdownItem toggle={false}>Delete</DropdownItem>}
                                onSuccess={() =>{setRefresh(true);}}
                            />
                        </Dropdown>
                        <TeamCreateModal season={season} onSuccess={() =>{setRefresh(true);}}/>
                    </div>
                )}
                emptySearchEl={
                    <NoDataCard>
                        <p>{ "No teams match your search criteria" }</p>
                    </NoDataCard>
                }
                tableProps={{
                    onRowSelect: setSelectedIds,
                    responsive: true,
                    striped: true,
                    emptyEl: (
                        <NoDataCard>
                            <p>{"It looks like you don't have any teams in this season yet. Create one to get started!"}</p>
                            <TeamCreateModal season={season} onSuccess={() =>{setRefresh(true);}}/>
                        </NoDataCard>
                    ),
                    columns: [
                        {header: 'Name', cell: 'name'},
                        {header: 'Matches', cell: (team) => team.matches.length},
                        {header: 'Players', cell: (team) => team.player_ids.length},
                        {header: 'Wins', cell: (team) => team.win_draw_loss_points.wins},
                        {header: 'Ties', cell: (team) => team.win_draw_loss_points.draws},
                        {header: 'Losses', cell: (team) => team.win_draw_loss_points.losses},
                        {header: 'Points', cell: (team) => team.win_draw_loss_points.points},
                        {cell: (item) => {
                            return (
                                <Dropdown dotdotdot >
                                    <TeamEditModal
                                        team={item}
                                        onSuccess={() =>{setRefresh(true);}}
                                    />
                                </Dropdown>
                            );
                        }},
                    ],
                }}
            />
        </div>
    );
});


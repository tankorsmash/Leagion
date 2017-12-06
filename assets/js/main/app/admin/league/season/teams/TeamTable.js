import {compose, setDisplayName, withState } from 'recompose';
import FontAwesome from 'react-fontawesome';

import {Dropdown, DropdownItem} from 'components/dropdowns';
import {Table, DataTable} from 'components/tables';
import {NoDataCard} from 'components/cards';

import TeamCreateModal from './TeamCreateModal';
import TeamEditModal from './TeamEditModal';
import TeamDeleteModal from './TeamDeleteModal';

const enhance = compose(
    withState('selectedRows', 'setSelectedRows', []),
    setDisplayName('TeamTable'),
);
export default enhance(({season, setRefresh, selectedRows, setSelectedRows}) => {
    return (
        <div>
            <DataTable
                url={reverse('api-my-comm-team-list')}
                params={{season: season.id}}
                toolbarLeft={(
                    <div className="d-flex">
                        <Dropdown
                            disabled={!selectedRows.length}
                            className="mr-1"
                            color="info"
                            buttonText="..."
                        >
                            <TeamDeleteModal onClick={() => {}} onSuccess={() =>{}}/>
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
                    onRowSelect: setSelectedRows,
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


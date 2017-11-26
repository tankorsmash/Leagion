import {compose, setDisplayName, withState } from 'recompose';
import FontAwesome from 'react-fontawesome';

import {Dropdown, DropdownItem} from 'components/dropdowns';
import {Table, DataTable} from 'components/tables';
import {NoDataCard} from 'components/cards';

import TeamCreateModal from './TeamCreateModal';

const enhance = compose(
    setDisplayName('TeamTable'),
);
export default enhance(({season, setRefresh}) => {
    return (
        <div>
            <DataTable
                url={reverse('api-team-list')}
                params={{season: season.id}}
                toolbarLeft={<TeamCreateModal season={season} onSuccess={() =>{setRefresh(true);}}/>}
                emptySearchEl={
                    <NoDataCard>
                        <p>{ "No teams match your search criteria" }</p>
                    </NoDataCard>
                }
                tableProps={{
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
                                    <DropdownItem
                                        onClick={() => {console.log(item.firstName + " is cool");}}
                                    > make cool </DropdownItem>
                                </Dropdown>
                            );
                        }},
                    ],
                }}
            />
        </div>
    );
});


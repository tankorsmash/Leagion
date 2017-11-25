import {compose, setDisplayName, withState } from 'recompose';
import FontAwesome from 'react-fontawesome';

import {Dropdown, DropdownItem} from 'components/dropdowns';
import DatasetView from 'components/DatasetView';
import {Table} from 'components/tables';

const enhance = compose(
    setDisplayName('SeasonCreateModal'),
    withState('teams', 'setTeams', []),
    withState('refresh', 'setRefresh', false),
);
export default enhance(({refresh, setRefresh, season, teams, setTeams}) => {
    return (
        <DatasetView
            url={reverse('api-team-list')}
            data={{season: season.id}}
            refresh={refresh} setRefresh={setRefresh}
            onSuccess={(teams) => {
                setTeams(teams);
                setRefresh(false);
            }}
        >
            <Table
                responsive striped
                data={teams}
                columns={[
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
                ]}
            />

        </DatasetView>
    );
});


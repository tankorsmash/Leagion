import {compose, setDisplayName, withState } from 'recompose';

import {Dropdown, DropdownItem} from 'components/dropdowns';
import {DataTable} from 'components/tables';
import {NoDataCard} from 'components/cards';

import PlayerCreateModal from './PlayerCreateModal';
//import PlayerEditModal from './PlayerEditModal';
import PlayerRemoveFromSeasonModal from './PlayerRemoveFromSeasonModal';
import {Avatar} from 'components/media';

const enhance = compose(
    withState('selectedIds', 'setSelectedIds', []),
    setDisplayName('PlayerTable'),
);
export default enhance(({season, setRefresh, selectedIds, setSelectedIds}) => {
    const seasonTeamIds = R.map(R.prop('id'), season.teams);
    const teamNameMap = R.reduce(
        (obj, team)=>{
            if (R.contains(team.id, seasonTeamIds)) {
                obj[team.id] = team;
            }
            return obj;
        },
        {},
        season.teams
    );
    return (
        <DataTable
            url={reverse('api-my-comm-player-list')}
            params={{teams__season: season.id}}
            toolbarLeft={(
                <div className="d-flex">
                    <PlayerCreateModal season={season} onSuccess={() =>{setRefresh(true);}}/>
                </div>
            )}
            emptySearchEl={
                <NoDataCard>
                    <p>{ "No players match your search criteria" }</p>
                </NoDataCard>
            }
            tableProps={{
                responsive: true,
                striped: true,
                emptyEl: (
                    <NoDataCard>
                        <p>{"It looks like you don't have any players in this season yet. Create one to get started!"}</p>
                        <PlayerCreateModal season={season} onSuccess={() =>{setRefresh(true);}}/>
                    </NoDataCard>
                ),
                columns: [
                    {header: 'Avatar', cell: (player) => (
                        <Avatar className="player-logo" size="xs" src={player.avatar_url}/>
                    )},
                    {header: 'First Name', cell: 'first_name'},
                    {header: 'Last Name', cell: 'last_name'},
                    {header: 'Email', cell: 'email'},
                    {header: 'Mobile #', cell: 'default_phonenumber'},
                    {header: 'Alternate #', cell: 'alt_phonenumber'},
                    {header: 'Status', cell: 'status'},
                    {header: 'Team', cell: (player) => {
                        const playerTeamIds = R.map(R.prop('id'), player.teams);
                        const teamIds = R.intersection(seasonTeamIds, playerTeamIds);
                        const teamNames = R.map((id)=>(teamNameMap[id].name), teamIds);
                        return R.join(', ', teamNames);
                    }},
                    {cell: (item) => {
                        return (
                            <Dropdown dotdotdot >
                                {/*
                                <PlayerEditModal
                                    player={item} onSuccess={() =>{setRefresh(true);}}
                                    Opener={<DropdownItem toggle={false}>{'Rename'}</DropdownItem>}
                                />
                                <PlayerDeleteModal
                                    player={item} onSuccess={() =>{setRefresh(true);}}
                                    Opener={<DropdownItem toggle={false}>{'Delete'}</DropdownItem>}
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


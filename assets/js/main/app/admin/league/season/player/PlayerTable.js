import {compose, setDisplayName, withState } from 'recompose';
import Select from 'react-select';
import FontAwesome from 'react-fontawesome';

import {Dropdown, DropdownItem} from 'components/dropdowns';
import {DataTable} from 'components/tables';
import {NoDataCard} from 'components/cards';
import {SearchInput} from 'components/forms';
import {Button} from 'components/buttons';

import PlayerInviteModal from './PlayerInviteModal';
import ChangeAvatarModal from './ChangeAvatarModal';
import {Avatar} from 'components/media';

const enhance = compose(
    withState('selectedIds', 'setSelectedIds', []),
    withState('selectedTeam', 'setSelectedTeam', null),
    setDisplayName('PlayerTable'),
);
export default enhance(({season, setRefresh, selectedIds,
    setSelectedIds, selectedTeam, setSelectedTeam}) => {
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
            toolbar={[
                <Select
                    key={'select'}
                    value={selectedTeam}
                    options={season.teams.map((team) => ({label: team.name, value: team.id}))}
                    onChange={(item)=>{setSelectedTeam(item.value);}}
                    placeholder={'filter by team'}
                />,
                <PlayerInviteModal
                    key={'invite'}
                    season={season} onSuccess={() =>{setRefresh(true);}}
                    Opener={
                        <Button color="primary" size="md" block >
                            <FontAwesome name="plus"/> {' Invite New Player'}
                        </Button>
                    }
                />
            ]}
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
                        <PlayerInviteModal season={season} onSuccess={() =>{setRefresh(true);}}/>
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
                            <Dropdown menuRight dotdotdot >
                                <ChangeAvatarModal
                                    player={item} onSuccess={() =>{setRefresh(true);}}
                                    Opener={<DropdownItem toggle={false}>{'Change Avatar'}</DropdownItem>}
                                />
                            </Dropdown>
                        );
                    }},
                ],
            }}
        />
    );
});


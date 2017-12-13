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
import PlayerRemoveFromTeamModal from './PlayerRemoveFromTeamModal';
import PlayerSetTeamCaptain from './PlayerSetTeamCaptain';
import {Avatar} from 'components/media';

const enhance = compose(
    withState('selectedIds', 'setSelectedIds', []),
    withState('selectedTeam', 'setSelectedTeam', null),
    setDisplayName('PlayerTable'),
);
export default enhance(({season, setRefresh,
    selectedTeam, setSelectedTeam}) => {
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
    const getTeamIds = R.compose(R.intersection(seasonTeamIds), R.map(R.prop('id')), R.prop('teams'));
    const getTeam = R.compose(R.head, R.map((id)=>(teamNameMap[id])), getTeamIds);
    const playerIsCaptain = player => {
        return player.captain_of_teams.includes(R.head(getTeamIds(player)));
    };

    let params = {
        teams__season: season.id,
    };
    if (selectedTeam) {
        params.teams = selectedTeam;
    }

    return (
        <DataTable
            url={reverse('api-my-comm-player-list')}
            params={params}
            toolbar={[
                <Select
                    key={'select'}
                    value={selectedTeam}
                    options={season.teams.map((team) => ({label: team.name, value: team.id}))}
                    onChange={(item)=>{ setSelectedTeam(item.value); }}
                    placeholder={'filter by team...'}
                />,
                <PlayerInviteModal
                    key={'inviter'}
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
                        <PlayerInviteModal
                            key={'inviter'}
                            season={season} onSuccess={() =>{setRefresh(true);}}
                            Opener={
                                <Button color="primary" size="md" block >
                                    <FontAwesome name="plus"/> {' Invite New Player'}
                                </Button>
                            }
                        />
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
                    {header: 'Status', cell: 'status'},
                    {header: 'Team', cell: (player) => {
                        return getTeam(player).name;
                    }},
                    {header: 'Captain', cell: (player) => {
                        if (playerIsCaptain(player)) {
                            return (
                                <div className="text-center">
                                    <FontAwesome className="le-captain-star" name="star"/>
                                </div>
                            );
                        }
                    }},
                    {cell: (player) => {
                        return (
                            <Dropdown menuRight dotdotdot >
                                <ChangeAvatarModal
                                    player={player} onSuccess={() =>{setRefresh(true);}}
                                    Opener={<DropdownItem toggle={false}>{'Change avatar'}</DropdownItem>}
                                />
                                <PlayerRemoveFromTeamModal
                                    player={player} team={getTeam(player)} onSuccess={() =>{setRefresh(true);}}
                                    Opener={<DropdownItem toggle={false}>{'Remove from team'}</DropdownItem>}
                                />

                                {!playerIsCaptain(player) &&
                                    <PlayerSetTeamCaptain
                                        set={true}
                                        player={player} team={getTeam(player)} onSuccess={() =>{setRefresh(true);}}
                                        Opener={<DropdownItem toggle={false}>{'Make team captain'}</DropdownItem>}
                                    />
                                }
                                {playerIsCaptain(player) &&
                                    <PlayerSetTeamCaptain
                                        set={false}
                                        player={player} team={getTeam(player)} onSuccess={() =>{setRefresh(true);}}
                                        Opener={<DropdownItem toggle={false}>{'Remove from captains'}</DropdownItem>}
                                    />
                                }
                            </Dropdown>
                        );
                    }},
                ],
            }}
        />
    );
});


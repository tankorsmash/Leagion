import {withState, compose, setDisplayName } from 'recompose';
import FontAwesome from 'react-fontawesome';

import {Dropdown, DropdownItem} from 'components/dropdowns';
import {DataTable} from 'components/tables';
import {NoDataCard} from 'components/cards';
import {SimpleModal} from 'components/modals';
import PlayerInviteModal from '../player/PlayerInviteModal';

import {Avatar} from 'components/media';

const enhance = compose(
    setDisplayName('TeamPlayerModal'),
);
export default enhance(({season, team, setRefresh, Opener}) => {
    return (
        <SimpleModal
            title={"Manage players for " + team.name}
            size="xl"
            Opener={Opener}
            submitText="Ok"
            body={
                <DataTable
                    noSearch
                    url={reverse('api-my-comm-player-list')}
                    params={{teams: [team.id]}}
                    toolbarLeft={(
                        <div className="d-flex">
                            <PlayerInviteModal season={season} onSuccess={() =>{setRefresh(true);}}/>
                        </div>
                    )}
                    tableProps={{
                        responsive: true,
                        striped: true,
                        emptyEl: (
                            <NoDataCard>
                                <p>{"It looks like you don't have any players on this team yet."}</p>
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
                            {cell: (item) => {
                                return (
                                    <Dropdown menuRight dotdotdot >
                                    </Dropdown>
                                );
                            }},
                        ],
                    }}
                />
            }
        />
    );
});

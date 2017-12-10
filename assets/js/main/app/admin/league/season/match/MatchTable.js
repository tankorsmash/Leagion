import {compose, setDisplayName, withState } from 'recompose';

import {Dropdown, DropdownItem} from 'components/dropdowns';
import {DataTable} from 'components/tables';
import {NoDataCard} from 'components/cards';

import MatchCreateModal from './MatchCreateModal';
import MatchEditModal from './MatchEditModal';
import MatchDeleteManyModal from './MatchDeleteManyModal';
import MatchDeleteModal from './MatchDeleteModal';
import TeamWithLogo from '../team/TeamWithLogo';
import {Avatar} from 'components/media';

const enhance = compose(
    withState('selectedIds', 'setSelectedIds', []),
    setDisplayName('MatchTable'),
);
export default enhance(({season, setRefresh, selectedIds, setSelectedIds}) => {
    return (
        <DataTable
            url={reverse('api-my-comm-match-list')}
            params={{season: season.id}}
            toolbarLeft={(
                <div className="d-flex">
                    <Dropdown
                        disabled={!selectedIds.length}
                        className="mr-1"
                        color="info"
                        buttonText="..."
                    >
                        <MatchDeleteManyModal
                            ids={selectedIds}
                            Opener={<DropdownItem toggle={false}>Delete</DropdownItem>}
                            onSuccess={() =>{setRefresh(true);}}
                        />
                    </Dropdown>
                    <MatchCreateModal season={season} onSuccess={() =>{setRefresh(true);}}/>
                </div>
            )}
            emptySearchEl={
                <NoDataCard>
                    <p>{ "No Matches match your search criteria" }</p>
                </NoDataCard>
            }
            tableProps={{
                onRowSelect: setSelectedIds,
                responsive: true,
                striped: true,
                emptyEl: (
                    <NoDataCard>
                        <p>{"It looks like you don't have any matches in this season yet. Create one to get started!"}</p>
                        <MatchCreateModal season={season} onSuccess={() =>{setRefresh(true);}}/>
                    </NoDataCard>
                ),
                columns: [
                    {header: 'Date', cell: 'pretty_date'},
                    {header: 'Time', cell: 'pretty_time'},
                    {header: 'Home Team', cell: (match) => (<TeamWithLogo team={match.home_team}/>)},
                    {header: '', cell: () => 'vs.'},
                    {header: 'Away Team', cell: (match) => (<TeamWithLogo team={match.away_team}/>)},
                    {header: 'Location', cell: (match) => match.location ? match.location.name : ''},
                    {header: 'Results', cell: (match) => {
                        if (match.completed) {
                            return <span>{match.home_points} - {match.away_points}</span>;
                        } else {
                            return <span>N/A </span>;
                        }
                    }},
                    {cell: (item) => {
                        return (
                            <Dropdown menuRight dotdotdot >
                                <MatchEditModal
                                    season={season} match={item}
                                    onSuccess={() =>{setRefresh(true);}}
                                    Opener={<DropdownItem toggle={false}>{'Edit'}</DropdownItem>}
                                />
                                <MatchDeleteModal
                                    match={item} onSuccess={() =>{setRefresh(true);}}
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


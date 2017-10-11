import {Switch} from 'react-router-dom';
import {Route} from 'components/router';
import SpinLoader from 'components/spinloader';

import {RoutedTabs} from 'components/tabs';
import DatasetView from 'components/dataset_view';

import teamUrls from 'main/app/player/team/urls';

import {MatchTable} from 'components/app/match';
import {PlayerAvatarList} from 'components/app/player';
import {TeamCard, TeamTitle, TeamInfoTab} from 'components/app/team';
import {Titlebar} from 'components/text';

import {FourOhFour} from 'components/error-pages';

import ajax from 'common/ajax';

class TeamDetail extends DatasetView {
    get datasetStateAttr() {
        return "team";
    }

    get datasetViewName() {
        return "api-team-detail";
    }

    get datasetViewKwargs() {
        return {team_id: this.props.match.params.teamId};
    }

    render() {
        const team = this.state.team;

        let tabs = [{
            label: 'Matches',
            id: 'matches',
            content: <MatchTable matches={team.matches} />
        }, {
            label: 'Team Members',
            id: 'team-members',
            content: <PlayerAvatarList size={100} players={team.players}/>
        }, {
            label: 'Team Details',
            id: 'team-details',
            content: <TeamInfoTab team={team}/>
        }];

        return (
            <SpinLoader loaded={this.getIsLoaded()}>
                <Titlebar title="My Team" />
                <div className="team-detail-header">
                    <TeamTitle team={team} />
                </div>
                <RoutedTabs
                    className="team-match-table"
                    tabs={tabs}
                    basePath={teamUrls.detail}
                    pathParams={{teamId: team.id}}
                />
            </SpinLoader>
        );
    }
}

export class TeamList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            teams: [],
            loaded: false
        };
    }

    componentDidMount() {
        ajax({
            url: reverse('api-my-team-list'),
        }).then(data => {
            this.setState({
                teams: data,
                loaded: true
            });
        });
    }

    render() {
        return (
            <SpinLoader loaded={this.state.loaded}>
                <Titlebar title="My Teams" />
                <div className="content team-listing">
                    {this.state.teams.map((team, i) => {
                        return (
                            <TeamCard key={i} team={team} />
                        );
                    })}
                </div>
            </SpinLoader>
        );
    }
}

export class Team extends React.Component {

    render() {
        return (
            <Switch>
                <Route exact path={teamUrls.index} component={TeamList} />
                <Route path={teamUrls.detailWide} component={TeamDetail} />
                <Route component={FourOhFour} />
            </Switch>
        );
    }
}

import SpinLoader from 'components/spinloader';
import {Titlebar} from 'components/text';
import DatasetView from 'components/dataset_view';
import ajax from 'common/ajax';

import TeamCard from 'main/app/player/league/season/team/TeamCard';

export default class TeamList extends DatasetView {
    get datasetViewName() {
        return "api-my-team-list";
    }

    get datasetStateAttr() {
        return "teams";
    }

    get datasetInitialValue() {
        return [];
    }

    render() {
        return (
            <SpinLoader loaded={this.getIsLoaded()}>
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

import {
    Form, FormGroup, Input, Dropdown, Label
} from 'reactstrap';

import FuzzySearch from 'react-fuzzy';
import Datetime from 'react-datetime';

import {DATE_FORMAT} from 'main/app/admin/constants';

import DatasetView from 'components/dataset_view';

function search_location_template(props, state, styles, clickHandler) {
    return state.results.map((location, i) => {
        const style = state.selectedIndex === i ? styles.selectedResultStyle : styles.resultsStyle;
        return (
            <div key={i} style={style} onClick={() => clickHandler(i)}>
                {location.name}
            </div>
        );
    });
}

class FuzzyLocationInput extends DatasetView {
    get datasetStateAttr() {
        return "locations";
    }

    get datasetViewName() {
        return "api-location-list";
    }

    render() {
        if (this.getIsLoaded() == false) {
            return (<div> Gathering available locations... </div>);
        }

        let formData = this.props.formData;
        return (
            <FuzzySearch
                list={this.state.locations}
                keys={['name', 'address']}
                width={430}
                onSelect={this.props.onSelect}
                resultsTemplate={search_location_template}
                placeholder={"Add location"}
                name="location_id"
            />
        );
    }
}


function search_team_template(props, state, styles, clickHandler) {
    return state.results.map((team, i) => {
        const style = state.selectedIndex === i ? styles.selectedResultStyle : styles.resultsStyle;
        return (
            <div key={i} style={style} onClick={() => clickHandler(i)}>
                {team.name}
            </div>
        );
    });
}

class FuzzyTeamInput extends DatasetView {
    get datasetStateAttr() {
        return "teams";
    }

    get datasetViewName() {
        return "api-team-list";
    }

    onSelect = (team) => {
        this.setState({
            "chosen_team_name": team.name
        });
        this.props.onSelect(team);
    };

    render() {
        if (this.getIsLoaded() == false) {
            return (<div> Gathering available teams... </div>);
        }

        let teamsToChoose = this.state.teams.filter((team) => {
            return team.id != this.props.teamIdToExclude;
        });

        return (
            <div>
                <strong> <em> { this.state.chosen_team_name } </em> </strong>
                <FuzzySearch
                    list={teamsToChoose}
                    keys={['name']}
                    width={430}
                    onSelect={this.onSelect}
                    resultsTemplate={search_team_template}
                    placeholder={"Add team"}
                />
            </div>
        );
    }
}

export default class MatchCreateForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            other_team_name: ""
        };
    };

    updateHomeOrAwayData = () => {
        //since home and away teams are relevant to the serializer and model we
        //need to make sure we're sending the right stuff. other team can be
        //home or away team
        const formData = this.props.formData;
        if (formData.home_or_away == "home") {
            this.props.updateFormState({
                "home_team_id": formData.my_team_id,
                "away_team_id": formData.other_team_id
            });
        } else {
            this.props.updateFormState({
                "away_team_id": formData.my_team_id,
                "home_team_id": formData.other_team_id
            });
        };

    }

    handleMatchDateChange = (moment) => {
        if (!moment._isAMomentObject){
            console.warn("invalid date format for start date");
            return;
        };

		this.props.updateFormState({
            "match_datetime": moment.format("YYYY-MM-DDThh:mm"),
		});
    };


    componentWillReceiveProps(nextProps) {
        if(this.props != nextProps) {
            this.setState({
                form: this.props.formData,
            });
        }
    }

    render() {
        let formData = this.props.formData;
        return (
            <Form onSubmit={this.props.handleSubmit} >
                <FormGroup>
                    { /* Match date */ }
                    <Label for="date">Date</Label>
                    <Datetime
                        dateFormat={DATE_FORMAT}
                        timeFormat={false}
                        onChange={this.handleMatchDateChange}
                        value={formData.match_datetime}
                        type="date"
                        name="match_datetime"
                        id="match_datetime"
                        placeholder="2016/01/30"/>

                    { /* Location */ }
                    <Label for="location">Location:
                        <br/>
                        <strong> { this.state.location_name } </strong>
                    </Label>
                    <FuzzyLocationInput
                        onSelect={(location) => {
                            this.setState({
                                location_name: location.name,
                            });
                            this.props.updateFormState(
                                { "location_id": location.id },
                            );
                        }}
                    />

                    { /* Home */ }
                    <Label for="home_team_id">Home Team: </Label>
                    <FuzzyTeamInput
                        teamIdToExclude={formData.away_team_id}
                        onSelect={(team) => {
                            this.props.updateFormState(
                                { "home_team_id": team.id },
                            );
                        }}
                    />

                    { /* Away team */ }
                    <Label for="away_team_id">
                        Away Team:
                    </Label>
                    <FuzzyTeamInput
                        teamIdToExclude= {formData.home_team_id}
                        onSelect={(team) => {
                            this.props.updateFormState(
                                { "away_team_id": team.id },
                            );
                        }}
                    />
                </FormGroup>
            </Form>
        );
    }
}

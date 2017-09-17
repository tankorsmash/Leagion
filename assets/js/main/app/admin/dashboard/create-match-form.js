import {
    Form, FormGroup, Input, Dropdown, Label
} from 'reactstrap';

import FuzzySearch from 'react-fuzzy';
import Datetime from 'react-datetime';

import {DATE_FORMAT} from 'main/app/admin/constants';

import DatasetView from 'components/dataset_view';

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

    render() {
        if (this.getIsLoaded() == false) {
            return (<div> Gathering available teams... </div>);
        }

        let formData = this.props.formData;
        return (
            <FuzzySearch
                list={this.state.teams}
                keys={['name']}
                width={430}
                onSelect={this.props.onSelect}
                resultsTemplate={search_team_template}
                placeholder={"Add team"}
                name="other_team_id"
            />
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

                    { /* Home */ }
                    <Label for="home_or_away">Home or away game?</Label>
                    <Input
                        onChange={this.props.handleInputChange}
                        value={formData.home_or_away}
                        type="select"
                        name="home_or_away"
                        id="home_or_away"
                        placeholder="Ottawa">
                        <option value="-1">Select one</option>
                        <option value="home">Home</option>
                        <option value="away">Away</option>
                    </Input>

                    { /* Location */ }
                    <Label for="location">Location</Label>
                    <Input
                        onChange={this.props.handleInputChange}
                        value={formData.location}
                        type="text"
                        name="location"
                        id="location"
                        placeholder="Ottawa"/>

                    { /* Other team */ }
                    <Label for="other_team_id">
                        Opposing team:
                        <br/>
                        <strong> { this.state.other_team_name } </strong>
                    </Label>
                    <FuzzyTeamInput
                        onSelect={(team) => {
                            this.setState({
                                other_team_name: team.name,
                            });
                            this.props.updateFormState(
                                { "other_team_id": team.id },
                                this.updateHomeOrAwayData
                            );
                        }}
                    />
                </FormGroup>
            </Form>
        );
    }
}



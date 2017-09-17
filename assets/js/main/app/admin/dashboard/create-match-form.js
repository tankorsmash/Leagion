import {
    Form, FormGroup, Input, Dropdown, Label
} from 'reactstrap';

import FuzzySearch from 'react-fuzzy';

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
    };

    updateHomeOrAwayData = () => {
        //since home and away teams are relevant to the serializer and model we
        //need to make sure we're sending the right stuff. other team can be
        //home or away team

        console.log("WOOOOOOO updateHomeOrAwayData... before state update my team (%s) other (%s)", this.props.formData.my_team_id, this.props.formData.other_team_id);
        let formData = this.props.formData;

        let printData = ()=> {
            console.log("PRINT DATA after state update on parent:");
            console.log("home_team_id", formData.home_team_id);
            console.log("away_team_id", formData.away_team_id);
        };
        if (formData.home_or_away == "home") {
            console.log("...home");
            this.props.updateFormData("home_team_id", formData.my_team_id, printData);
            this.props.updateFormData("away_team_id", formData.other_team_id, printData);
        } else {
            console.log("...away");
            this.props.updateFormData("away_team_id", formData.my_team_id, printData);
            this.props.updateFormData("home_team_id", formData.other_team_id, printData);
        };

    }

    componentWillReceiveProps(nextProps) {
        if(this.props != nextProps) {
            this.setState({
                form: this.props.formData,
            });
        }
    }

    render() {
        let formData = this.props.formData;
        console.log("formData in render", formData);
        return (
            <Form onSubmit={this.props.handleSubmit} >
                <FormGroup>
                    { /* Name */ }
                    <Label for="date">Date</Label>
                    <Input
                        onChange={this.props.handleInputChange}
                        value={formData.date}
                        type="text"
                        name="date"
                        id="date"
                        placeholder="2017/12/25"/>
                    <Label for="home_or_away">Home or Away?</Label>
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
                    <Label for="location">Location</Label>
                    <Input
                        onChange={this.props.handleInputChange}
                        value={formData.location}
                        type="text"
                        name="location"
                        id="location"
                        placeholder="Ottawa"/>
                    { /* Email */ }
                    <Label for="other_team_id">{formData.home_or_away == "away" ? "Home" : "Away" }  Team</Label>
                    <FuzzyTeamInput
                        onSelect={(team) => {
                            this.props.updateFormData("other_team_id", team.id, this.updateHomeOrAwayData);
                        }}
                    />
                </FormGroup>
            </Form>
        );
    }
}



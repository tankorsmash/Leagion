import {
    Form, FormGroup, Input, Dropdown, Label,
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
                name="other_team"
            />
        );
    }
}

export default class MatchCreateForm extends React.Component {
    render() {
        let formData = this.props.formData;
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
                    <Label for="location">Location</Label>
                    <Input
                        onChange={this.props.handleInputChange}
                        value={formData.location}
                        type="text"
                        name="location"
                        id="location"
                        placeholder="Ottawa"/>
                    { /* Email */ }
                    <Label for="other_team">Other Team</Label>
                    <FuzzyTeamInput
                        onSelect={(team) => { this.props.updateFormData("team_id", team.id); }}
                    />
                </FormGroup>
            </Form>
        );
    }
}



import {
    Form, FormGroup, Input, Dropdown, Label,
} from 'reactstrap';

import {DatasetView} from 'components/dataset_view';

class LeagueSelectInput extends DatasetView {
    get datasetStateAttr() {
        return "leagues";
    }

    get datasetViewName() {
        return "api-league-list";
    }

    render() {
        let options = [];
        if (this.getIsLoaded() == false) {
            options.push(<option key={0}> Loading Leagues</option>);
        } else {
            this.state.leagues.map((league) => {
                options.push(<option value={league.id} key={league.id}> {league.name}</option>);
            });
        }
        return (
            <Input
                type="select"
                onChange={this.props.handleInputChange}
                value={this.props.leagueId}
                name="leagueId"
                id="leagueId" >
                { options }
            </Input>
        );
    }
}


export default class TeamCreateForm extends React.Component {
    render() {
        let formData = this.props.formData;
        return (
            <Form onSubmit={this.props.handleSubmit} >
                <FormGroup>
                    <Label for="name">Team name:</Label>
                    <Input
                        onChange={this.props.handleInputChange}
                        value={formData.name}
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Sports Team Three"/>
                </FormGroup>
                <FormGroup>
                    <Label for="name">League:</Label>
                    <LeagueSelectInput
                        handleInputChange={this.props.handleInputChange}
                        value={formData.leagueId}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="name">Season:</Label>
                    <Input
                        type="select"
                        onChange={this.props.handleInputChange}
                        value={formData.seasonId}
                        name="seasonId"
                        id="seasonId" >
                        <option> PLACEHOLDER SEASON </option>
                    </Input>
                </FormGroup>
            </Form>
        );
    }
}



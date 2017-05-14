import {
    Form, FormGroup, Input, Dropdown, Label,
} from 'reactstrap';

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
                    <Input
                        type="select"
                        onChange={this.props.handleInputChange}
                        value={formData.leagueId}
                        name="leagueId"
                        id="leagueId" >
                        <option> PLACEHOLDER LEAGUE </option>
                    </Input>
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



import {
    Form, FormGroup, Input, Dropdown, Label,
} from 'reactstrap';

import DatasetView from 'components/dataset_view';

export default class PlayerCreateForm extends React.Component {
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
                    <Label for="other_team">other_team</Label>
                    <Input
                        onChange={this.props.handleInputChange}
                        value={formData.other_team}
                        type="email"
                        name="other_team"
                        id="other_team"
                        placeholder="New York Yankees"/>
                    { /* Password */ }
                    <Label for="password">Password</Label>
                    <Input
                        onChange={this.props.handleInputChange}
                        value={formData.password}
                        type="password"
                        name="password"
                        id="password"
                        placeholder=""/>
                </FormGroup>
            </Form>
        );
    }
}



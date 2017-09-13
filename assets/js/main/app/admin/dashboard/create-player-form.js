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
                    <Label for="first_name">First name</Label>
                    <Input
                        onChange={this.props.handleInputChange}
                        value={formData.first_name}
                        type="text"
                        name="first_name"
                        id="first_name"
                        placeholder="John"/>
                    <Label for="last_name">Last_name</Label>
                    <Input
                        onChange={this.props.handleInputChange}
                        value={formData.last_name}
                        type="text"
                        name="last_name"
                        id="last_name"
                        placeholder="Smith"/>
                    { /* Email */ }
                    <Label for="email">Email</Label>
                    <Input
                        onChange={this.props.handleInputChange}
                        value={formData.email}
                        type="email"
                        name="email"
                        id="email"
                        placeholder="john@mail.ca"/>
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



import {Input, Label, Row, Col, FormGroup} from 'reactstrap';

export default class BaseComponent extends React.Component {
    constructor (props) {
        super(props);
        this.state = {};

        this.required_attrs = this.constructor.required_attrs;
        this.optional_attrs = this.constructor.optional_attrs;

        if (!this.required_attrs || !this.optional_attrs) {
            throw 'please define required_attrs and optional_attr';
        }

        for (let attr in this.required_attrs) {
            this.state[attr] = this.required_attrs[attr][0];
        }

        for (let attr in this.optional_attrs) {
            this.state[attr] = '';
        }
    }

    changeRequiredAttr = (e) => {
        const attr = e.target.dataset.attr;
        const value = e.target.value;
        this.setState({[attr]: value});
    };

    render() {
        return (
            <div>
                <Row>
                    <Col className="component-lib-component" md="6">
                        {this.renderComponent()}
                        {Object.keys(this.required_attrs).map((attr, i) => {
                            const choices = this.required_attrs[attr];
                            return (
                                <FormGroup row key={i}>
                                    <Label sm={6}>{attr}</Label>
                                    <Col className="" sm="6">
                                        <Input
                                            type="select"
                                            data-attr={attr}
                                            onChange={this.changeRequiredAttr}
                                        >
                                            {choices.map((choice, j) => {
                                                return <option key={j} value={choice}>{choice}</option>;
                                            })}

                                        </Input>
                                    </Col>
                                </FormGroup>
                            );
                        })}
                    </Col>
                    <Col className="" md="6">
                        {this.renderCode()}
                    </Col>
                </Row>
            </div>
        );
    }
}


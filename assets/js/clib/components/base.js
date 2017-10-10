import {Input, Label, Row, Col, FormGroup} from 'reactstrap';
import SyntaxHighlighter from 'react-syntax-highlighter';

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

        for (let attr of this.optional_attrs) {
            this.state[attr] = false;
        }
    }

    changeAttr = (e) => {
        const attr = e.target.dataset.attr;
        const value = e.target.value;
        this.setState({[attr]: value});
    };

    changeOptionalAttr = (e) => {
        const attr = e.target.dataset.attr;
        const value = e.target.checked;
        this.setState({[attr]: value});
    };

    render() {
        return (
            <div>
                <Row>
                    <Col className="clib-component" md="6">
                        {this.renderComponent()}
                    </Col>
                    <Col className="" md="6">
                        <SyntaxHighlighter
                            language="javascript"
                        >
                            {this.renderCode()}
                        </SyntaxHighlighter>
                        <h5 className="clib-title">
                            Component Properties
                        </h5>
                        {Object.keys(this.required_attrs).map((attr, i) => {
                            const choices = this.required_attrs[attr];
                            return (
                                <FormGroup row key={i}>
                                    <Label sm={6}>{attr}</Label>
                                    <Col className="" sm="6">
                                        <Input
                                            type="select"
                                            data-attr={attr}
                                            onChange={this.changeAttr}
                                        >
                                            {choices.map((choice, j) => {
                                                return <option key={j} value={choice}>{choice}</option>;
                                            })}

                                        </Input>
                                    </Col>
                                </FormGroup>
                            );
                        })}
                        {this.optional_attrs.map((attr, i) => {
                            return (
                                <FormGroup row key={i}>
                                    <Label sm={6}>{attr}</Label>
                                    <Col className="" sm="6">
                                        <Input
                                            type="checkbox"
                                            data-attr={attr}
                                            onClick={this.changeOptionalAttr}
                                        ></Input>
                                    </Col>
                                </FormGroup>
                            )
                        })}
                    </Col>
                </Row>
            </div>
        );
    }
}


import {Input, Label, Row, Col, FormGroup} from 'reactstrap';
import CodeMirror from 'react-codemirror2';
import 'codemirror/mode/jsx/jsx';
import PropTypes from 'prop-types';

export default class BaseComponent extends React.Component {
    constructor (props) {
        super(props);
        this.state = {};

        this.choice_attrs = this.constructor.choice_attrs;

        if (!this.choice_attrs) {
            throw 'please define choice_attrs';
        }

        if (!this.constructor.component) {
            throw 'A static property of "component" is required\
                in order to extract proptypes';
        }

        for (let attr in this.choice_attrs) {
            this.state[attr] = this.choice_attrs[attr][0];
        }

        this.bool_attrs = [];
        for (let attr of Object.keys(this.constructor.component.propTypes)) {
            const propType = this.constructor.component.propTypes[attr];
            if (propType === PropTypes.bool) {
                this.state[attr] = false;
                this.bool_attrs.push(attr);
            }
        }

        this.string_attrs = [];
        for (let attr of Object.keys(this.constructor.component.propTypes)) {
            const propType = this.constructor.component.propTypes[attr];
            if (
                propType === PropTypes.string &&
                !Object.keys(this.choice_attrs).includes(attr)
            ) {
                this.state[attr] = 'Default Text';
                this.string_attrs.push(attr);
            }
        }
    }

    getAttrsAsCode = () => {
        let attrs = '';
        for (let attr in this.choice_attrs) {
            attrs += `${attr}="${this.state[attr]}" `;
        }

        for (let attr of this.bool_attrs) {
            if (this.state[attr]) {
                attrs += `${attr} `;
            }
        }

        for (let attr of this.string_attrs) {
            if (this.state[attr]) {
                attrs += `${attr}="${this.state[attr]}" `;
            }
        }

        return attrs;
    };

    changeAttr = (e) => {
        const attr = e.target.dataset.attr;
        const value = e.target.value || 'Default Text';
        this.setState({[attr]: value});
    };

    changeBoolAttr = (e) => {
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
                    <Col className="clib-component-props" md="6">
                        <CodeMirror
                            value={this.renderCode()}
                            options={{
                                mode: 'jsx',
                                theme: 'monokai',
                                indentUnit: 4,
                            }}
                        />
                        <h5 className="clib-title">
                            Component Properties
                        </h5>
                        {Object.keys(this.choice_attrs).map((attr, i) => {
                            const choices = this.choice_attrs[attr];
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
                        {this.string_attrs.map((attr, i) => {
                            return (
                                <FormGroup row key={i}>
                                    <Label sm={6}>{attr}</Label>
                                    <Col className="" sm="6">
                                        <Input
                                            type="text"
                                            data-attr={attr}
                                            onChange={this.changeAttr}
                                        ></Input>
                                    </Col>
                                </FormGroup>
                            );
                        })}
                        {this.bool_attrs.map((attr, i) => {
                            return (
                                <FormGroup row key={i}>
                                    <Label sm={6}>{attr}</Label>
                                    <Col className="" sm="6">
                                        <Input
                                            type="checkbox"
                                            data-attr={attr}
                                            onClick={this.changeBoolAttr}
                                        ></Input>
                                    </Col>
                                </FormGroup>
                            );
                        })}
                    </Col>
                </Row>
            </div>
        );
    }
}


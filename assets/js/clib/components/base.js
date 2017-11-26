import {Input, Label, Row, Col, FormGroup} from 'reactstrap';
import {Controlled as CodeMirror} from 'react-codemirror2';
import 'codemirror/mode/jsx/jsx';
import PropTypes from 'prop-types';

export class BaseComponent extends React.Component {
    constructor (props) {
        super(props);
        this.state = this.state || {};

        this.choiceAttrs = this.constructor.choiceAttrs || {};
        this.ignoreAttrs = this.constructor.ignoreAttrs || [];
        this.defaultAttrs = this.constructor.defaultAttrs || {};

        for (let attr in this.choiceAttrs) {
            this.state[attr] = this.choiceAttrs[attr][0];
        }

        const component = this.constructor.component;
        const hasComponentAndProptypes = component && component.propTypes;
        const hasComponentAndDefaultProps = component && component.defaultProps;

        if (hasComponentAndDefaultProps) {
            this.defaultAttrs = Object.assign({}, component.defaultProps, this.defaultAttrs);
        }

        this.boolAttrs = [];
        if (hasComponentAndProptypes) {
            for (let attr of Object.keys(component.propTypes)) {
                const propType = component.propTypes[attr];
                if (
                    propType === PropTypes.bool &&
                    !this.ignoreAttrs.includes(attr)
                ) {
                    this.state[attr] = false;
                    this.boolAttrs.push(attr);
                }
            }
        }

        this.stringAttrs = [];
        if (hasComponentAndProptypes) {
            for (let attr of Object.keys(component.propTypes)) {
                const propType = component.propTypes[attr];
                if (
                    [PropTypes.string, PropTypes.string.isRequired].includes(propType) &&
                    !Object.keys(this.choiceAttrs).includes(attr) &&
                    !this.ignoreAttrs.includes(attr)
                ) {
                    this.state[attr] = '';
                    this.stringAttrs.push(attr);
                }
            }
        }

        for (let attr of Object.keys(this.defaultAttrs)) {
            this.state[attr] = this.defaultAttrs[attr];
        }
    }

    getAttrsAsCode = () => {
        let attrs = '';
        for (let attr in this.choiceAttrs) {
            attrs += `${attr}="${this.state[attr]}" `;
        }

        for (let attr of this.boolAttrs) {
            if (this.state[attr]) {
                attrs += `${attr} `;
            }
        }

        for (let attr of this.stringAttrs) {
            if (this.state[attr]) {
                attrs += `${attr}="${this.state[attr]}" `;
            }
        }

        return attrs;
    };

    changeAttr = (e) => {
        const attr = e.target.dataset.attr;
        const value = e.target.value || '';
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
                        <h3>{this.title}</h3>
                        <p>{this.description}</p>
                        <div className="actual-component">
                            {this.renderComponent()}
                        </div>
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
                        {Object.keys(this.choiceAttrs).map((attr, i) => {
                            const choices = this.choiceAttrs[attr];
                            return (
                                <FormGroup row key={i}>
                                    <Label sm={6}>{attr}</Label>
                                    <Col className="" sm="6">
                                        <Input
                                            type="select"
                                            data-attr={attr}
                                            onChange={this.changeAttr}
                                            value={this.state[attr]}
                                        >
                                            {choices.map((choice, j) => {
                                                return <option key={j} value={choice}>{choice}</option>;
                                            })}

                                        </Input>
                                    </Col>
                                </FormGroup>
                            );
                        })}
                        {this.stringAttrs.map((attr, i) => {
                            return (
                                <FormGroup row key={i}>
                                    <Label sm={6}>{attr}</Label>
                                    <Col className="" sm="6">
                                        <Input
                                            type="text"
                                            data-attr={attr}
                                            onChange={this.changeAttr}
                                            value={this.state[attr]}
                                        ></Input>
                                    </Col>
                                </FormGroup>
                            );
                        })}
                        {this.boolAttrs.map((attr, i) => {
                            return (
                                <FormGroup row key={i}>
                                    <Label sm={6}>{attr}</Label>
                                    <Col className="" sm="6">
                                        <Input
                                            type="checkbox"
                                            data-attr={attr}
                                            onChange={this.changeBoolAttr}
                                            checked={this.state[attr]}
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

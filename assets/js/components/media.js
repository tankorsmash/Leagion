import PropTypes from 'prop-types';
import {Media} from 'reactstrap';

import {SimpleModal} from 'components/modals';

export class Avatar extends React.Component {
    static propTypes = {
        size: PropTypes.string.isRequired,
        src: PropTypes.string.isRequired,
        square: PropTypes.bool,
        style: PropTypes.object,
    };

    render() {
        const {size, src, square, className, style} = this.props;

        const circleClass = square ? '' : 'le-avatar-circle';
        const classNames = `le-avatar le-avatar-${size} ${circleClass} ${className}`;

        return (
            <Media
                className={classNames}
                object src={src}
                style={style}
            />
        );
    }
}

export class ColorSelector extends React.Component {
    static propTypes = {
        onConfirm: PropTypes.func.isRequired,
        title: PropTypes.string.isRequired,
        buttonText: PropTypes.string.isRequired,
        initialColor: PropTypes.number,
    };

    state = {
        color: this.props.initialColor,
    };

    reset = () => {
        this.setState({color: this.props.initialColor});
    };

    onConfirm = (toggle) => {
        this.props.onConfirm(this.state.color);
        toggle();
    };

    render() {
        let {colorPickerText, title, buttonText, colorChoices} = this.props;
        let {color} = this.state;

        return (
            <SimpleModal
                buttonText={buttonText} title={title} submitText="Save"
                body={
                    <div>
                        <div className="color-list-selector">
                            {Object.keys(colorChoices).map((val) => {
                                const active = color === val;
                                const activeClass = active ? 'active' : '';
                                const classNames = `color-list-choice ${activeClass}`;

                                return (
                                    <div
                                        key={val}
                                        className={classNames}
                                        style={{backgroundColor: colorChoices[val]}}
                                        onClick={() => this.setState({color: val})}
                                    ></div>
                                );
                            })
                            }

                        </div>
                    </div>
                }
                onSubmit={this.onConfirm}
                onClose={this.reset}
            />

        );
    }
}

import PropTypes from 'prop-types';

export const Ribbon = (props) => {
    return (
		<div className="two-sided-ribbon">
			<div className="p ribbon-left">
				{props.leftEl}
			</div>
			<div
				className="p ribbon-right"
				style={{backgroundColor: props.color}}
			>
				{props.rightEl}
			</div>
		</div>
    );
};

export class Titlebar extends React.Component {
    static propTypes = {
        className: PropTypes.string,
        title: PropTypes.string,
    };

    render() {
        let {className, title, right} = this.props;
        return (
            <LeftRight
                className={`titlebar ${className ? className : ""}`}
                left={<h3>{title}</h3>}
                right={right}
            />
        );
    }
}

export class LeftRight extends React.Component {
    static propTypes = {
        className: PropTypes.string,
    };

    render() {
        let {className, left, right} = this.props;
        return (
            <div className={'le-left-right row ' + className}>
                <div className="col-md-6">
                    {left && left}
                </div>
                <div className="col-md-6">
                    {right && right}
                </div>
            </div>
        );
    }
}

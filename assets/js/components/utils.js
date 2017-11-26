import PropTypes from 'prop-types';

//export class Breadcrumbs extends React.Component {
//}

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
            <div className={'le-left-right ' + className}>
                <div>
                    {left && left}
                </div>
                <div>
                    {right && right}
                </div>
            </div>
        );
    }
}

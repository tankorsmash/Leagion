import PropTypes from 'prop-types';

//export class Breadcrumbs extends React.Component {
//}

export class Titlebar extends React.Component {
    static propTypes = {
        className: PropTypes.string,
        title: PropTypes.string,
    };

    render() {
        let {className} = this.props;
        return (
            <h3 className={`titlebar ${className ? className : ""}`}>
                {this.props.title}
            </h3>
        );
    }
}


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
            <div className={`titlebar ${className ? className : ""}`}>
                <h3>{this.props.title}</h3>
                <div>
                    {this.props.right}
                </div>
            </div>
        );
    }
}


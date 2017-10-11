import PropTypes from 'prop-types';

//export class Breadcrumbs extends React.Component {
    //static propTypes = {
        //className: PropTypes.array,
        //title: PropTypes.string,
    //};

    //render() {
        //return (
            //<h3 className={"titlebar " + this.props.className}>
                //{this.props.title}
            //</h3>
        //);
    //}
//}

export class Titlebar extends React.Component {
    static propTypes = {
        className: PropTypes.string,
        title: PropTypes.string,
    };

    render() {
        return (
            <h3 className={"titlebar " + this.props.className}>
                {this.props.title}
            </h3>
        );
    }
}


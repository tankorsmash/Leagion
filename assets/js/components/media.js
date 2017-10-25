import PropTypes from 'prop-types';
import {Media} from 'reactstrap';

export class Avatar extends React.Component {
    static propTypes = {
        size: PropTypes.string.isRequired,
        src: PropTypes.string.isRequired,
        square: PropTypes.bool,
    };

    render() {
        const {size, src, square, className} = this.props;

        const circleClass = square ? '' : 'le-avatar-circle';
        const classNames = `le-avatar le-avatar-${size} ${circleClass} ${className}`;

        return (
            <Media
                className={classNames}
                object src={src}
            />
        );
    }
}

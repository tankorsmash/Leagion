import {Link as RLink} from 'react-router-dom';
import PropTypes from 'prop-types';

export class Link {
    static propTypes = {
        url: PropTypes.string,
        args: PropTypes.object,
    };

	render() {
		let {url, args, text} = this.props;

		for (let key of Object.keys(args)) {
			url = url.replace(`:${key}?`, args[key]);
		}

		return (
			<RLink to={url}>
				{text}
			</RLink>
		);
	}
}

export class DivLink {
    static propTypes = {
        url: PropTypes.string,
        args: PropTypes.object,
    };

	render() {
		let {url, args, text} = this.props;

		for (let key of Object.keys(args)) {
			url = url.replace(`:${key}?`, args[key]);
		}

		return (
			<RLink to={url}>
				{text}
			</RLink>
		);
	}
}

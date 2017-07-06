import PropTypes from 'prop-types';
import SpinLoader from 'components/spinloader';
import Titlebar from 'components/app/titlebar';
import Tabs from 'components/tabs';
import ProfileForm from 'main/app/player/account/profile';

import ajax from 'common/ajax';

export class Account extends React.Component {

	static propTypes = {
		user: PropTypes.object.isRequired,
	};

    constructor(props) {
        super(props);

        this.state = {
            loaded: false
        };
    }

    render() {
        return (
			<div>
				<Titlebar title="Account Settings" />
				<Tabs
					tabs={[{
						label: 'Profile',
						content: (<ProfileForm user={this.props.user} />)
					}, {
						label: 'Password',
						content: (<div>Password Settings</div>)
					}]}
				/>
			</div>
        );
    }
}

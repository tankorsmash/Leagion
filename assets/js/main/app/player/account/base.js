import SpinLoader from 'components/spinloader';

import ajax from 'common/ajax';

export class Account extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loaded: false
        };
    }

    componentDidMount() {
        ajax({
            url: reverse('api-my-league-list'),
        }).then(data => {
            this.setState({
                loaded: true
            });
        });
    }

    render() {
        return (
            <SpinLoader loaded={this.state.loaded}>
				<div>
					account settings
				</div>
            </SpinLoader>
        );
    }
}

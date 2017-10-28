import { withState, lifecycle, compose, setDisplayName } from 'recompose';
import ajax from 'common/ajax';
import SpinLoader from 'components/spinloader';

const enhance = compose(
    setDisplayName('DataSetView'),
    withState('isLoaded', 'setIsLoaded', false),
    lifecycle({
        componentDidMount() {
            let url = this.props.url;

            ajax({
                url: url,
            }).then(data => {
                this.props.onSuccess(data);
                this.props.setIsLoaded(true);
            }, error => {
                console.warn(error);
            });
        }
    })
);
export default enhance(({isLoaded, children}) => {
    return (
        <SpinLoader loaded={isLoaded}>
            {children}
        </SpinLoader>

    );
});

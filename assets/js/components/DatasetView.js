import { withPropsOnChange, withState, lifecycle, compose, setDisplayName } from 'recompose';
import ajax from 'common/ajax';
import SpinLoader from 'components/spinloader';

const enhance = compose(
    setDisplayName('DataSetView'),
    withState('isLoaded', 'setIsLoaded', false),
    lifecycle({
        componentWillMount() {
            ajax({
                url: this.props.url,
            }).then(data => {
                this.props.onSuccess(data);
                this.props.setIsLoaded(true);
            }, error => {
                console.warn(error);
            });
        },
        componentWillUpdate(props) {
            if (typeof(props.setRefresh) === 'function' && props.refresh) {
                props.setRefresh(false);
                props.setIsLoaded(false);

                ajax({
                    url: this.props.url,
                }).then(data => {
                    this.props.onSuccess(data);
                    this.props.setIsLoaded(true);
                }, error => {
                    console.warn(error);
                });
            }
        }
    })
);
export default enhance(({refresh, setRefresh, isLoaded, setIsLoaded, children}) => {
    return (
        <SpinLoader loaded={isLoaded}>
            {children}
        </SpinLoader>

    );
});

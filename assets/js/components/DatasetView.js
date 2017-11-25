import { withPropsOnChange, withState, lifecycle, compose, setDisplayName } from 'recompose';
import ajax from 'common/ajax';
import SpinLoader from 'components/spinloader';

const sendRequest = (props) => {
    const {url, data, onSuccess, setIsLoaded} = props;

    console.log(data);
    ajax({
        url: url,
        data: data,
    }).then(data => {
        onSuccess(data);
        setIsLoaded(true);
    }, error => {
        console.warn(error);
    });
}

const enhance = compose(
    setDisplayName('DataSetView'),
    withState('isLoaded', 'setIsLoaded', false),
    lifecycle({
        componentWillMount() {
            sendRequest(this.props);
        },
        componentWillUpdate(props) {
            if (typeof(props.setRefresh) === 'function' && props.refresh) {
                props.setRefresh(false);
                props.setIsLoaded(false);

                sendRequest(this.props);
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

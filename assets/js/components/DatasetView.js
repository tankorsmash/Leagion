import { withPropsOnChange, withState, lifecycle, compose, setDisplayName } from 'recompose';
import ajax from 'common/ajax';
import SpinLoader from 'components/spinloader';

const sendRequest = (props) => {
    const {url, onSuccess, setIsLoaded, search} = props;
    let data = Object.assign({}, props.data || {});

    if (search) {
        data.search = search;
    }

    ajax({
        url: url,
        data: data,
    }).then(data => {
        onSuccess(data);
        setIsLoaded(true);
    }, error => {
        console.warn(error);
    });
};

const enhance = compose(
    setDisplayName('DataSetView'),
    withState('isLoaded', 'setIsLoaded', false),
    lifecycle({
        componentWillMount() {
            sendRequest(this.props);
        },
        componentWillUpdate(props) {
            if (
                this.props.search !== props.search ||
                this.props.refreshObject !== props.refreshObject ||
                (
                    typeof(props.setRefresh) === 'function' &&
                    props.refresh
                )
            ) {
                props.setRefresh && props.setRefresh(false);
                props.setIsLoaded && props.setIsLoaded(false);
                sendRequest(props);
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

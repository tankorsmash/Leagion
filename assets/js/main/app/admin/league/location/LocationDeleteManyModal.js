import {compose, setDisplayName } from 'recompose';
import {SimpleModal} from 'components/modals';
import ajax from 'common/ajax';

const enhance = compose(
    setDisplayName('LocationDeleteManyModal'),
);
export default enhance(({onSuccess, ids, Opener}) => {
    const message = `Are you sure you want to delete these ${ids.length} locations?`;
    return (
        <SimpleModal
            size="sm" title="Delete Locations" Opener={Opener}
            submitText="Confirm" body={<p>{message}</p>}
            onSubmit={() => {
                ajax({
                    url: reverse('api-my-comm-location-list'),
                    method: 'POST',
                    data: {
                        delete: true,
                        ids: ids,
                    },
                }).then(data => {
                    toastr.success(ids.length + " locations deleted!");
                    onSuccess();
                }).catch(data => {
                    toastr.error(data);
                });
            }}
        />
    );
});

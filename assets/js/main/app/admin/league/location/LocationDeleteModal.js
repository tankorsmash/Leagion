import {compose, setDisplayName } from 'recompose';
import {SimpleModal} from 'components/modals';
import ajax from 'common/ajax';

const enhance = compose(
    setDisplayName('LocationDeleteModal'),
);
export default enhance(({onSuccess, location, Opener}) => {
    const message = `Are you sure you want to delete the location: "${location.name}"?`;
    return (
        <SimpleModal
            size="sm" title="Delete Location" Opener={Opener}
            submitText="Confirm" body={<p>{message}</p>}
            onSubmit={() => {
                ajax({
                    url: reverse('api-my-comm-location-detail', {location_id: location.id}),
                    method: 'DELETE',
                }).then(data => {
                    toastr.success(`location: "${location.name}" deleted!`);
                    onSuccess();
                }).catch(data => {
                    toastr.error(data);
                });
            }}
        />
    );
});

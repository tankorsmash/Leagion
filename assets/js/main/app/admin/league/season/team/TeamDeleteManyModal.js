import {compose, setDisplayName } from 'recompose';
import {SimpleModal} from 'components/modals';
import ajax from 'common/ajax';

const enhance = compose(
    setDisplayName('TeamDeleteManyModal'),
);
export default enhance(({onSuccess, ids, Opener}) => {
    const message = `Are you sure you want to delete these ${ids.length} teams?`;
    return (
        <SimpleModal
            size="sm" title="Delete Teams" Opener={Opener}
            submitText="Confirm" body={<p>{message}</p>}
            onSubmit={() => {
                ajax({
                    url: reverse('api-my-comm-team-list'),
                    method: 'POST',
                    data: {
                        delete: true,
                        ids: ids,
                    },
                }).then(data => {
                    toastr.success(ids.length + " teams deleted!");
                    onSuccess();
                }).catch(data => {
                    toastr.error(data);
                });
            }}
        />
    );
});

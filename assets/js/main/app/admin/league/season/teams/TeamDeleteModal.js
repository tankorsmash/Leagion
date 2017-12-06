import {compose, setDisplayName } from 'recompose';

import {Dropdown, DropdownItem} from 'components/dropdowns';
import {SimpleModal} from 'components/modals';
import ajax from 'common/ajax';

const enhance = compose(
    setDisplayName('TeamDeleteModal'),
);
export default enhance(({team, onSuccess, count}) => {
    const title = count > 1 ? "Delete Teams" : "Delete Team";
    //const message = `Are you sure you want to delete these teams`;
    return (
        <SimpleModal
            size="" title={title}
            Opener={<DropdownItem toggle={false}>Delete Team</DropdownItem>}
            body={<p>Are you sure you want to delete</p>}
            onSubmit={(e, toggle) => {
                ajax({
                    url: reverse('api-my-comm-team-list'),
                    method: 'POST',
                    data: {
                        delete: true,
                    },
                }).then(data => {
                    toastr.success("Team Changed!");
                    toggle();
                    onSuccess();
                }).catch(data => {
                    setErrors(data);
                });
            }}
        />
    );
});

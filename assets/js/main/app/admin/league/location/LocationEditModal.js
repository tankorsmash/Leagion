import {compose, setDisplayName } from 'recompose';
import {FormModal} from 'components/modals';
import {Form, FormGroup, FormGroupWrap} from 'components/forms';
import ajax from 'common/ajax';

const enhance = compose(
    setDisplayName('LocationEditModal'),
);
export default enhance(({season, onSuccess, location, Opener}) => {
    return (
        <FormModal
            title="Edit location"
            Opener={Opener}
            body={
                <Form
                    onSubmit={(form, setErrors, setSuccess) => {
                        ajax({
                            url: reverse('api-my-comm-location-detail', {location_id: location.id}),
                            method: 'PUT',
                            data: form,
                        }).then(data => {
                            toastr.success("Location changed!");
                            setSuccess();
                            onSuccess();
                        }).catch(data => {
                            setErrors(data);
                        });
                    }}
                    form={{
                        'name': location.name,
                        'address': location.address,
                        'league': season.league.id,
                        'address_latitude': location.address_latitude,
                        'address_longitude': location.address_longitude,
                    }}
                >
                    <FormGroup label="Name" type="text" id="name" />
                    <FormGroup label="Address" type="map" id="address" lat='address_latitude' lng='address_longitude' />
                </Form>
            }
        />
    );
});

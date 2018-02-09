import {compose, setDisplayName } from 'recompose';
import FontAwesome from 'react-fontawesome';

import {Button} from 'components/buttons';
import {FormModal} from 'components/modals';
import {Form, FormGroup, FormGroupWrap} from 'components/forms';
import ajax from 'common/ajax';

const enhance = compose(
    setDisplayName('LocationCreateModal'),
);
export default enhance(({season, onSuccess}) => {
    return (
        <FormModal
            title="Add a new location"
            Opener={
                <Button color="primary" size="md" >
                    <FontAwesome name="plus"/> {' Add New Location'}
                </Button>
            }
            body={
                <Form
                    onSubmit={(form, setErrors, setSuccess) => {
                        ajax({
                            url: reverse('api-my-comm-location-list'),
                            method: 'POST',
                            data: form,
                        }).then(data => {
                            toastr.success("Location Added!");
                            setSuccess();
                            onSuccess();
                        }).catch(data => {
                            setErrors(data);
                        });
                    }}
                    form={{
                        'name': '',
                        'address': '',
                        'league': season.league.id,
                        'address_latitude': null,
                        'address_longitude': null,
                    }}
                >
                    <FormGroup forminput label="Name" type="text" id="name" />
                    <FormGroup forminput label="Address" type="map" id="address" lat='address_latitude' lng='address_longitude' />
                </Form>
            }
        />
    );
});

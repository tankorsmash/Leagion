import {compose, setDisplayName } from 'recompose';
import FontAwesome from 'react-fontawesome';

import {Button} from 'components/buttons';
import {FormModal} from 'components/modals';
import {Form, FormGroup, FormGroupWrap} from 'components/forms';
import ajax from 'common/ajax';

const enhance = compose(
    setDisplayName('SeasonCreateModal'),
);
export default enhance(({league}) => {
    return (
        <FormModal
            title="New Season"
            Opener={
                <Button color="primary" size="md" >
                    <FontAwesome name="plus"/> {' New Season'}
                </Button>
            }
            body={
                <Form
                    onSubmit={(form, setErrors, setSuccess) => {
                        ajax({
                            url: reverse('api-season-list'),
                            method: 'POST',
                            data: form,
                        }).then(data => {
                            toastr.success("Season Created!");
                            setSuccess();
                            //this.props.updateScore(data);
                        }).catch(data => {
                            setErrors(data);
                        });
                    }}
                    form={{
                        'start_date': '',
                        'end_date': '',
                        'league_id': league.id,
                    }}
                >
                    <FormGroupWrap row>
                        <FormGroup className="col-md-6" label="Start date" type="date" id="start_date" />
                        <FormGroup className="col-md-6" label="End date" type="date" id="end_date" />
                    </FormGroupWrap>
                </Form>
            }
        />
    );
});

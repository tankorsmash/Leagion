import PropTypes from 'prop-types';
import {
    Button,
    Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle,
    Form, FormGroup, Input, Label,
} from 'reactstrap';

import {FormBase} from 'components/forms';

import ajax from 'common/ajax';

export default class FormModal extends FormBase {
    static defaultProps = {
        successMessage: "Success!",
        errorMessage: "Error!",
    };

    static propTypes = {
        formData: PropTypes.object.isRequired,
        postUrl: PropTypes.string.isRequired,
        formComponent: PropTypes.func.isRequired,

        successMessage: PropTypes.string,
        errorMessage: PropTypes.string,
    };

    constructor(props) {
        super(props);
        this.state = {
            'modal': false,

            form: this.props.formData,
        };

        this.toggle = this.toggle.bind(this);
    }

    handleSubmit = (e) => {
        e.preventDefault();

        ajax({
            url: this.props.postUrl,
            method: 'POST',
            data: this.state.form
        }).then(data => {
            this.setState({
                'modal': false,
            });

            toastr.success(this.props.successMessage);

            if (this.props.triggerRefreshOnGrid !== undefined) {
                this.props.triggerRefreshOnGrid();
            };

        }, error => {
            toastr.error(this.props.errorMessage);
            //TODO error handling
        });
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    render() {
        const FormComponent = this.props.formComponent;
        return (
            <div>
                <Button color="primary" onClick={this.toggle}>{this.props.buttonLabel}</Button>

                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Create Team</ModalHeader>
                    <ModalBody>
                        <FormComponent
                            handleInputChange={this.handleInputChange}
                            formData={this.state.form}
                            handleSubmit={this.handleSubmit} />
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.handleSubmit}>Create!</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}


import PropTypes from 'prop-types';
import {
    Modal as RModal, ModalBody, ModalFooter, ModalHeader
} from 'reactstrap';
import FontAwesome from 'react-fontawesome';

import {uuid4} from 'common/utils';
import {Button} from 'components/buttons';

export class Modal extends React.Component {
    static propTypes = {
        toggle: PropTypes.func,
        isOpen: PropTypes.bool,
        className: PropTypes.string,
        title: PropTypes.string,
        body: PropTypes.element,
        footer: PropTypes.element,
        cancelAttrs: PropTypes.object,
        submitAttrs: PropTypes.object,
        size: PropTypes.string,
    };

    render() {
        const {
            title, className, toggle,
            isOpen, body, footer, size
        } = this.props;

        return (
            <RModal
                fade={true}
                isOpen={isOpen}
                toggle={toggle}
                className={className}
                size={size}
                autoFocus={true}
            >

                <div className="modal-header">
                    <h3 className="modal-title">{title}</h3>
                    <button type="button" className="close" onClick={toggle}>
                        <FontAwesome name="times" />
                    </button>
                </div>

                <ModalBody>
                    {body}
                </ModalBody>

                <ModalFooter>
                    {footer}
                </ModalFooter>
            </RModal>
        );
    }
}

export class SimpleModal extends Modal {
    static propTypes = {
        Opener: PropTypes.element,
        buttonProps: PropTypes.shape(Button.propTypes),
        className: PropTypes.string,
        title: PropTypes.string,
        body: PropTypes.element,
        submitText: PropTypes.string,
        onSubmit: PropTypes.func,
        onclose: PropTypes.func,
        size: PropTypes.string,
    };

    static defaultProps = {
        onClose: () => {},
    };

    state = {isOpen: false};

    toggle = (e) => {
        if (e) e.preventDefault();
        if (this.state.isOpen) {
            this.props.onClose();
        }
        this.setState({isOpen: !this.state.isOpen});
        return false;
    };

    handleSubmit = () => {
        this.props.onSubmit(this.toggle);
    };

    render() {
        const {
            buttonProps, body, title, onSubmit,
            submitAttrs, cancelAttrs, size, Opener,
        } = this.props;

        const submitText = this.props.submitText || 'Submit';

        return (
            <div onClick={this.toggle}>
                {Opener}
                <Modal
                    toggle={this.toggle}
                    isOpen={this.state.isOpen}
                    title={title}
                    size={size}
                    footer={
                        <div>
                            <Button {...cancelAttrs} color="info" onClick={this.toggle}>Cancel</Button>
                            {' '}
                            {onSubmit &&
                                <Button {...submitAttrs} color="primary" onClick={this.handleSubmit}>{submitText}</Button>
                            }
                        </div>
                    }
                    body={body}
                />
            </div>
        );
    }
}

export class FormModal extends Modal {
    static propTypes = {
        Opener: PropTypes.element,
        buttonProps: PropTypes.shape(Button.propTypes),
        className: PropTypes.string,
        title: PropTypes.string,
        body: PropTypes.element,
        submitText: PropTypes.string,
        onclose: PropTypes.func,
        size: PropTypes.string,
    };

    static defaultProps = {
        onClose: () => {},
    };

    state = {isOpen: false};

    toggle = (e) => {
        if (e) e.preventDefault();
        if (this.state.isOpen) {
            this.props.onClose();
        }
        this.setState({isOpen: !this.state.isOpen});
        return false;
    };

    render() {
        const {
            buttonProps, body, title,
            submitAttrs, cancelAttrs, size, Opener
        } = this.props;

        const submitText = this.props.submitText || 'Submit';
        const formId = uuid4();

        const form = React.cloneElement(body, {
            setSuccess: () => {this.toggle();},
            id: formId,
        });

        const OpenerToggler = React.cloneElement(Opener, { onClick: this.toggle, });

        return (
            <div>
                {OpenerToggler}
                <Modal
                    toggle={this.toggle}
                    isOpen={this.state.isOpen}
                    title={title}
                    size={size}
                    footer={
                        <div>
                            <Button {...cancelAttrs} color="info" onClick={this.toggle}>Cancel</Button>
                            {' '}
                            <Button {...submitAttrs} color="primary" form={formId}>{submitText}</Button>
                        </div>
                    }
                    body={form}
                />
            </div>
        );
    }
}

import PropTypes from 'prop-types';
import {
    Modal as RModal, ModalBody, ModalFooter, ModalHeader
} from 'reactstrap';
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
    };

    render() {
        const {
            title, className, toggle,
            isOpen, body, footer
        } = this.props;

        return (
            <RModal
                fade={true}
                isOpen={isOpen}
                toggle={toggle}
                className={className}>

                <ModalHeader toggle={toggle}>{title}</ModalHeader>

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
        buttonText: PropTypes.string,
        buttonProps: PropTypes.shape(Button.propTypes),
        className: PropTypes.string,
        title: PropTypes.string,
        body: PropTypes.element,
        submitText: PropTypes.string,
        onSubmit: PropTypes.func,
    };

    state = {isOpen: false};

    toggle = () => {
        if (this.state.isOpen) {
            this.props.onClose();
        }
        this.setState({
            isOpen: !this.state.isOpen
        });
        return false;
    };

    handleSubmit = () => {
        this.props.onSubmit(this.toggle);
    };

    render() {
        const {
            buttonProps, buttonText, body, title,
            submitAttrs, cancelAttrs
        } = this.props;

        const submitText = this.props.submitText || 'Submit';

        return (
            <div>
                <Button
                    href="#"
                    onClick={this.toggle}
                    {...buttonProps}
                >
                    {buttonText}
                </Button>
                <Modal
                    toggle={this.toggle}
                    isOpen={this.state.isOpen}
                    title={title}
                    footer={
                        <div>
                            <Button {...cancelAttrs} color="link" onClick={this.toggle}>Cancel</Button>
                            {' '}
                            <Button {...submitAttrs} color="primary" onClick={this.handleSubmit}>{submitText}</Button>
                        </div>
                    }
                    body={body}
                />
            </div>
        );
    }
}

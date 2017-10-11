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
    };

    state = {isOpen: false};

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });

        return false;
    };

    render() {
        const {
            handleSubmit, buttonProps, buttonText,
            body, title,
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
                            <Button color="link" onClick={this.toggle}>Cancel</Button>
                            {' '}
                            <Button color="primary" onClick={handleSubmit}>{submitText}</Button>
                        </div>
                    }
                    body={body}
                />
            </div>
        );
    }
}

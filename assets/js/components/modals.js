import {
    Modal as BSModal, ModalBody, ModalFooter, ModalHeader
} from 'reactstrap';

export class Modal extends React.Component {
    render() {
		//left and right buttons have el
		const { title, className, toggle, isOpen } = this.props;

        return (
			<BSModal
				backdropTransitionTimeout={25}
				modalTransitionTimeout={50}
				fade={false}
				isOpen={isOpen}
				toggle={toggle}
				className={className}>

				<ModalHeader toggle={toggle}> {title}</ModalHeader>

				<ModalBody>
					{this.props.body}
				</ModalBody>

				<ModalFooter>
					{this.props.footer}
				</ModalFooter>
			</BSModal>
        );
    }
}

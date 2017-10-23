import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import {SimpleModal} from 'components/modals';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

export class AvatarSelector extends React.Component {
    static propTypes = {
        onConfirm: PropTypes.func.isRequired,
        dropzoneText: PropTypes.string.isRequired,
        avatarSize: PropTypes.string,
        title: PropTypes.string.isRequired,
        buttonText: PropTypes.string.isRequired,
    };

    static defaultProps = {
        avatarSize: "md",
    };

    state = {file: null};

    onDrop = (file) => {
        this.setState({file: file[0]});
    };

    onConfirm = (toggle) => {
        this.cropper.getCroppedCanvas().toBlob((blob) => {
            this.props.onConfirm(blob);
        });

    };

    reset = () => {
        this.setState({file: null});
    };

    render() {
        let {dropzoneText, title, buttonText} = this.props;
        let {file} = this.state;

        return (
            <SimpleModal
                buttonText={buttonText} title={title} submitText="Save"
                body={
                    !file ? (
                        <Dropzone onDrop={this.onDrop}>
                            {dropzoneText ?  dropzoneText : ''}
                        </Dropzone>
                    ) : (
                        <div>
                            <Cropper
                                ref={(el) => {this.cropper = el;}}
                                style={{
                                    width:'100%',
                                    height:'400px'
                                }}
                                src={file.preview}
                                aspectRatio={1}
                                guides={false}
                                crop={this.crop}
                            />
                        </div>
                    )
                }
                onSubmit={this.onConfirm}
                onClose={this.reset}
            />

        );
    }
}

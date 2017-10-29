import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import {SimpleModal} from 'components/modals';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

export class AvatarSelector extends React.Component {
    static propTypes = {
        onConfirm: PropTypes.func.isRequired,
        dropzoneText: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        buttonText: PropTypes.string.isRequired,
    };

    state = {
        file: null,
        allowSave: false,
    };

    onDrop = (file) => {
        this.setState({
            file: file[0],
            allowSave: true,
        });

    };

    onConfirm = (toggle) => {
        this.cropper.getCroppedCanvas().toBlob((blob) => {
            this.props.onConfirm(blob);
            toggle();
        });

    };

    reset = () => {
        this.setState({
            file: null,
            allowSave: false,
        });
    };

    render() {
        let {dropzoneText, title, buttonText} = this.props;
        let {file, allowSave} = this.state;

        return (
            <SimpleModal
                buttonText={buttonText} title={title} submitText="Save"
                body={
                    !file ? (
                        <Dropzone
                            onDrop={this.onDrop}
                            style={{}}
                            className="le-avatar-dropzone"
                        >
                            <h5>{dropzoneText ?  dropzoneText : ''}</h5>
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
                submitAttrs={{
                    disabled: !allowSave,
                }}
                onSubmit={this.onConfirm}
                onClose={this.reset}
            />

        );
    }
}
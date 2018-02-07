import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import SpinLoader from 'components/spinloader';
import {SimpleModal} from 'components/modals';
import {Button} from 'components/buttons';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

export class AvatarSelector extends React.Component {
    static propTypes = {
        onConfirm: PropTypes.func.isRequired,
        dropzoneText: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        Opener: PropTypes.element.isRequired,
    };

    state = {
        file: null,
        allowSave: false,
        uploading: false,
    };

    onDrop = (file) => {
        this.setState({
            file: file[0],
            allowSave: true,
        });

    };

    onConfirm = (toggle) => {
        this.cropper.getCroppedCanvas().toBlob((blob) => {
            if (blob.size < 3000000) {
                this.setState(uploading:true);
                this.props.onConfirm(blob, toggle);
            } else {
                toastr.error('Image too big, must be under 3MB');
                toggle();
            }
        });

    };

    reset = () => {
        this.setState({
            file: null,
            allowSave: false,
        });
    };

    render() {
        let {dropzoneText, title, Opener} = this.props;
        let {file, allowSave, uploading} = this.state;

        return (
            <SimpleModal
                title={title} submitText="Save"
                Opener={Opener}
                body={
                    <div>
                        {uploading &&
                            <div>
                                <h5>uploading image...</h5>
                                <SpinLoader loaded={false} />
                            </div>
                        }
                        {!file && !uploading &&
                            <Dropzone
                                onDrop={this.onDrop}
                                style={{}}
                                className="le-avatar-dropzone"
                            >
                                <h5>{dropzoneText ?  dropzoneText : ''}</h5>
                            </Dropzone>
                        }
                        {file && !uploading &&
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
                        }
                    </div>
                }
                submitAttrs={{
                    disabled: !allowSave || uploading,
                }}
                onSubmit={this.onConfirm}
                onClose={this.reset}
            />

        );
    }
}

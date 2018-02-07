import ajax from 'common/ajax';
import {Avatar} from 'components/media';
import {AvatarSelector} from 'components/files';
import {Button} from 'components/buttons';

export default class ChangeAvatarForm extends React.Component {
    upload = (file, toggle) => {
        let data  = new FormData();
        data.append('avatar', file);

        ajax({
            url: this.props.url,
            data: data,
            requireLogin: true,
            stringifyData: false,
            headers: {},
            method: 'PATCH',
        }).then(data => {
            toastr.success('Avatar successfully changed!');
            this.props.onSuccess(data);
            toggle();
        }).catch(() => {
            toastr.error('Unknown error occurred updating avatar.');
            toggle();
        });
    };

    render() {
        return (
            <div className="avatar-form">
                <h3>Avatar</h3>
                <Avatar size="md" src={this.props.user.avatar_url}  />
                <AvatarSelector
                    dropzoneText="Drag and drop or click to upload avatar"
                    title="Change your avatar"
                    Opener={<Button>Change Avatar</Button>}
                    onConfirm={this.upload}
                />
            </div>
        );
    }

}

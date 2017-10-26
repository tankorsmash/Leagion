import ajax from 'common/ajax';
import {Avatar} from 'components/media';
import {AvatarSelector} from 'components/files';

export default class ChangeAvatarForm extends React.Component {
    url = 'api-my-details';

    upload = (file) => {
        let data  = new FormData();
        data.append('avatar', file);

        ajax({
            url: reverse(this.url),
            data: data,
            requireLogin: true,
            stringifyData: false,
            headers: {},
            method: 'PATCH',
        }).then(data => {
            toastr.success('Avatar successfully changed!');
            this.props.setUserState(data);
        }).catch(() => {
            toastr.error('Unknown error occurred updating avatar.');
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
                    buttonText="Change Avatar"
                    onConfirm={this.upload}
                />
            </div>
        );
    }

}

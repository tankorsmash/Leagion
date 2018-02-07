import ajax from 'common/ajax';
import {Avatar} from 'components/media';
import {AvatarSelector} from 'components/files';
import {Button} from 'components/buttons';

export default class TeamLogoUploader extends React.Component {
    upload = (file, onComplete) => {
        let data  = new FormData();
        data.append('logo', file);

        let url = this.props.url;
        ajax({
            url:url,
            data:data,
            method:"PATCH",
            stringifyData: false,
            headers: {},
        }).then(data => {
            toastr.success("Successfully updated team logo!");
            this.props.onSuccess(data);
            toggle();
        }).catch(response => {
            toastr.error("Unknown error occurred updating team logo.");
            toggle();
        });
    };

    render() {
        let {team} = this.props;
        return (
            <div className="team-logo-changer">
                <h3>Logo</h3>
                <Avatar className="team-logo" size="md" src={team.logo_url}  />

                <AvatarSelector
                    dropzoneText="Drag and drop or click to upload file"
                    title="Change your team's logo"
                    Opener={<Button>Change Logo</Button>}
                    onConfirm={this.upload}
                />
            </div>
        );
    }
}


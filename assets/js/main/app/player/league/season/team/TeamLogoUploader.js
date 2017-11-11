import ajax from 'common/ajax';
import {Avatar} from 'components/media';
import {AvatarSelector} from 'components/files';
import {Button} from 'components/buttons';

export default class TeamLogoUploader extends React.Component {
    upload = (file) => {
        let data  = new FormData();
        data.append('logo', file);

        let url = reverse("api-team-detail", {team_id: this.props.team.id});
        ajax({
            url:url,
            data:data,
            method:"PATCH",
            stringifyData: false,
            headers: {},
        }).then(data => {
            toastr.success("Successfully updated team logo!");
            this.props.setTeam(data);
        }).catch(response => {
            toastr.error("Unknown error occurred updating team logo.");
        });
    };

    render() {
        let {team, isCaptain} = this.props;
        return (
            <div className="team-logo-changer">
                <h3>Logo</h3>
                <Avatar className="team-logo" size="md" src={team.logo_url}  />

                {isCaptain &&
                    <AvatarSelector
                        dropzoneText="Drag and drop or click to upload file"
                        title="Change your team's logo"
                        Opener={<Button>Change Logo</Button>}
                        onConfirm={this.upload}
                    />
                }
            </div>
        );
    }
}


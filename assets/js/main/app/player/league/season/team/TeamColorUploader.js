import ajax from 'common/ajax';
import {ColorSelector} from 'components/media';
import {Button} from 'components/buttons';

export default class TeamColorUploader extends React.Component {
    changeColor = (color) => {
        ajax({
            url: reverse('api-my-team-detail', {team_id: this.props.team.id}),
            data: {color: color},
            method: 'PATCH',
        }).then(data => {
            this.props.setTeam(data);
            toastr.success('Updated team color!');
        });
    };

    render() {
        const {constants, team, isCaptain, Opener} = this.props;
        return (
            <div className="team-color-changer">
                <h3> Color </h3>
                <div className="team-color"
                    style={{backgroundColor: constants.teamColors[team.color]}}>
                </div>
                {isCaptain &&
                    <ColorSelector
                        title="Change your team's Color"
                        Opener={<Button>Change Team Color</Button>}
                        onConfirm={this.changeColor}
                        initialColor={team.color || 0}
                        colorChoices={constants.teamColors}
                    />
                }
            </div>
        );
    }
}


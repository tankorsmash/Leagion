import {compose, setDisplayName } from 'recompose';
import {SimpleModal} from 'components/modals';
import TeamLogoUploader from 'main/app/player/league/season/team/TeamLogoUploader';

const enhance = compose(
    setDisplayName('TeamChangeLogoModal'),
);
export default enhance(({team, onSuccess, Opener}) => {
    return (
        <SimpleModal
            size="md" title={'Change logo for: ' + team.name}
            Opener={Opener}
            body={
                <div className="text-center">
                    <TeamLogoUploader
                        onSuccess={onSuccess}
                        team={team}
                        url={reverse('api-my-comm-team-detail', {team_id: team.id})}
                    />
                </div>
            }
            submitText="Ok"
        />
    );
});


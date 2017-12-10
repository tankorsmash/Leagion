import {Avatar} from 'components/media';
import {compose, setDisplayName} from 'recompose';

const enhance = compose(
    setDisplayName('TeamWithLogo'),
);
export default enhance(({team}) => {
    return (
        <span>
            <Avatar className="team-logo" size="xs" src={team.logo_url}/>
            <span className="pl-1">{team.name}</span>
        </span>
    );
});

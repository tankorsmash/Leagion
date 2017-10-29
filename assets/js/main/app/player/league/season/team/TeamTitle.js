import {compose, setDisplayName} from 'recompose';

import {Link} from 'components/buttons';
import {Ribbon} from 'components/misc';
import {Avatar} from 'components/media';

import urls from 'main/app/player/urls';

const enhance = compose(
	setDisplayName('TeamTitle'),
);
export default enhance(({team}) => {
    return (
        <div className="team-box-wrapper">
            <div className="team-box">
                <div className="team-box-main">
                    <Avatar className="team-logo" size="md" src={team.logo_url}  />
                    <div className="h3 team-title">
                        {team.name}
                    </div>
                </div>
            </div>
            <Ribbon
                color={team.color_value}
                leftEl={
                    <Link
                        url={urls.leagueDetail}
                        args={{leagueId: team.season.league.id}}
                    >
                        {team.season.league.name}
                    </Link>
                }
                rightEl={
                    <Link
                        url={urls.seasonDetail}
                        args={{
                            leagueId: team.season.league.id,
                            seasonId: team.season.id,
                        }}
                    >
                        {team.season.pretty_date}
                    </Link>
                }
            />
        </div>
    );
});

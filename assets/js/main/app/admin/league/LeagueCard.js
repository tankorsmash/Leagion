import {compose, setDisplayName } from 'recompose';
import SeasonList from './season/SeasonList';

const enhance = compose(
    setDisplayName('LeagueCard'),
);
export default enhance(({league}) => {
    return (
        <div className="league-card">
            <div className="h4 title">
                {league.name}
            </div>
            { league.current_season ? (
                <div className="current-season">
                    <div className="h5">
                        {/*
                            <Link
                                url={urls.leagueDetail}
                                args={{leagueId: team.season.league.id}}
                            >
                            </Link>
                            */
                            league.current_season.pretty_date
                        }
                    </div>
                </div>
            ) : (
                <div className="current-season">
                    no season currently underway
                </div>
            )}
            <SeasonList title="Future Seasons" seasons={league.future_seasons} />
            <SeasonList title="Past Seasons" seasons={league.past_seasons} />
        </div>
    );
});

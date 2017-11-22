import {compose, setDisplayName } from 'recompose';
import FontAwesome from 'react-fontawesome';
import SeasonList from './season/SeasonList';
import SeasonCreateModal from './season/SeasonCreateModal';
import urls from 'main/app/admin/urls';
import {Link} from 'components/buttons';


const SeasonStat = props => {
    return (
        <div className="season-stat">
            <div className="left">
                <span>{props.icon}</span>
                <span>{props.text}</span>
            </div>
            <div className="right">{props.right}</div>
        </div>
    );
};

const enhance = compose(
    setDisplayName('LeagueCard'),
);
export default enhance(({league, setRefresh}) => {
    const season = league.current_season;
    const SeasonTag = season ? Link : 'div';
    return (
        <div className="league-card">
            <div className="h4 title">
                {league.name}
            </div>
            <div className="current-season">
                <SeasonTag
                    url={season && urls.seasonDetail}
                    args={season && {
                        leagueId: league.id,
                        seasonId: season.id,
                    }}
                >
                    <div className="top">
                        <div className="h5">Current Season</div>
                        {
                            season && (
                                <div className="h5">
                                    {'(' + season.pretty_date + ')'}
                                </div>
                            )
                        }
                    </div>
                </SeasonTag>
                <div className="bottom">
                    {
                        season ? (
                            <div>
                                <SeasonStat
                                    icon={<FontAwesome name="futbol-o"/>}
                                    text="Matches played"
                                    right={season.matches_completed_count + '/' + season.matches.length}
                                />
                                <SeasonStat
                                    icon={<FontAwesome name="user"/>}
                                    text="Players"
                                    right={season.players.length}
                                />
                                <SeasonStat
                                    icon={<FontAwesome name="users"/>}
                                    text="Teams"
                                    right={season.teams.length}
                                />
                            </div>
                        ) : 'No season currently in progress'
                    }
                </div>
            </div>
            <div className="seasons-inline">
                <SeasonList title="Future Seasons" league={league}
                    seasons={league.future_seasons} />
                <SeasonList title="Past Seasons" league={league}
                    seasons={league.past_seasons} />
            </div>
            <SeasonCreateModal
                league={league}
                onSuccess={() => {setRefresh(true);}}
            />
        </div>
    );
});

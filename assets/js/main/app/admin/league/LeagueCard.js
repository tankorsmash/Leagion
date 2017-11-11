import {compose, setDisplayName } from 'recompose';
import SeasonList from './season/SeasonList';
import FontAwesome from 'react-fontawesome';
import {Button} from 'components/buttons';

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
export default enhance(({league}) => {
    const season = league.current_season;
    return (
        <div className="league-card">
            <div className="h4 title">
                {league.name}
            </div>
            <div className="current-season">
                <div className="top">
                    <div className="h5">Current Season</div>
                    {
                        season && (
                            <div className="h5">
                                {'(' + league.current_season.pretty_date + ')'}
                            </div>
                        )
                    }
                </div>
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
                <SeasonList title="Future Seasons" seasons={league.future_seasons} />
                <SeasonList title="Past Seasons" seasons={league.past_seasons} />
            </div>
            <Button color="primary" size="md" >
                <FontAwesome name="plus"/> {' New Season'}
            </Button>
        </div>
    );
});

import {compose, setDisplayName } from 'recompose';
import urls from 'main/app/admin/urls';
import {Link} from 'components/buttons';

const enhance = compose(
    setDisplayName('SeasonList'),
);
export default enhance(({league, seasons, title, className}) => {
    if (seasons.length) {
        return (
            <div className={"season-list " + className} >
                <div className="h5">
                    {title}
                </div>
                {seasons.map((season, i) => {
                    return (
                        <div className="h6" key={i}>
                            <Link
                                url={season && urls.seasonDetail}
                                args={season && {
                                    leagueId: league.id,
                                    seasonId: season.id,
                                }}
                            >
                                {season.pretty_date}
                            </Link>
                        </div>
                    );
                })}
            </div>
        );
    } else {
        return null;
    }
});


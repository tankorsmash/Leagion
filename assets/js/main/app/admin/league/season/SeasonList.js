import {compose, setDisplayName } from 'recompose';

const enhance = compose(
    setDisplayName('SeasonList'),
);
export default enhance(({seasons, title}) => {
    return (
        <div className="season-list">
            <div className="h5">
                {/*
                <Link
                    url={urls.leagueDetail}
                    args={{leagueId: team.season.league.id}}
                >
                </Link>
                */}
                {title}
            </div>
            {seasons.map((season, i) => {
                return (
                    <div key={i}>
                        {season.pretty_date}
                    </div>
                );
            })}
        </div>
    );
});


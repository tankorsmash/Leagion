import {compose, setDisplayName } from 'recompose';

const enhance = compose(
    setDisplayName('SeasonList'),
);
export default enhance(({seasons, title, className}) => {
    if (seasons.length) {
        return (
            <div className={"season-list " + className} >
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
                        <div className="h6" key={i}>
                            {season.pretty_date}
                        </div>
                    );
                })}
            </div>
        );
    } else {
        return null;
    }
});


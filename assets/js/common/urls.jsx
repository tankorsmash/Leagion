let rootUrl = '/main';
let appUrl = `${rootUrl}/app`;

let leaguesUrl = `${appUrl}/leagues`;
let teamsUrl = `${appUrl}/teams`;
let matchesUrl = `${appUrl}/matches`;

module.exports = {
    root: `${rootUrl}`,

    //registration
    login: `${rootUrl}/login`,
    register: `${rootUrl}/register`,

    //app
    app: {
        index: appUrl,
        leagues: {
            index: leaguesUrl,
            detail: `${leaguesUrl}/:leagueId?`,
        },
        teams: {
            index: teamsUrl,
            detail: `${teamsUrl}/:teamId?`,
        },
        matches: {
            index: matchesUrl,
            detail: `${matchesUrl}/:matchId?`,
            create: `${matchesUrl}/create`,
        },
        admin: {

        },
    }
}

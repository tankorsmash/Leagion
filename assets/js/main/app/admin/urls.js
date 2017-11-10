import appUrls from 'main/app/urls';
let index = `${appUrls.index}/admin`;
let dashboardUrl = `${index}/dashboard`;

let leaguesUrl = `${index}/leagues`;
let seasonsUrl = `${index}/seasons`;
let locationsUrl = `${index}/locations`;
let teamsUrl = `${index}/teams`;
let matchesUrl = `${index}/matches`;
let playersUrl = `${index}/players`;

function buildSimpleUrls(root, kwargName) {
    return {
        index: root,
        detail: `${root}/:${kwargName}`,
        create: `${root}/create`
    }
};

module.exports = {
    index: index,
    dashboard: {
        index: dashboardUrl,
        overview: `${dashboardUrl}/overview`,
        leagues: `${dashboardUrl}/leagues`,
        teams: `${dashboardUrl}/teams`,
        players: `${dashboardUrl}/players`,
    },

    leagues: buildSimpleUrls(leaguesUrl, "leagueId"),
    seasons: buildSimpleUrls(seasonsUrl, "seasonId"),
    locations: buildSimpleUrls(locationsUrl, "locationId"),
    teams: {
        addPlayerToTeam: `${teamsUrl}/add-players`,
        ...buildSimpleUrls(teamsUrl, "teamId"),
    },
    matches: buildSimpleUrls(matchesUrl, "matchId"),
    players: buildSimpleUrls(playersUrl, "playerId"),
}

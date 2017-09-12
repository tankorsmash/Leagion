import appUrls from 'main/app/urls';
let adminUrl = `${appUrls.index}/admin`;
let dashboardUrl = `${adminUrl}/dashboard`;

let leaguesUrl = `${adminUrl}/leagues`;
let seasonsUrl = `${adminUrl}/seasons`;
let locationsUrl = `${adminUrl}/locations`;
let teamsUrl = `${adminUrl}/teams`;
let matchesUrl = `${adminUrl}/matches`;
let playersUrl = `${adminUrl}/players`;

function buildSimpleUrls(root, kwargName) {
    return {
        index: root,
        detail: `${root}/:${kwargName}`,
        create: `${root}/create`
    }
};

module.exports = {
    index: adminUrl,
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

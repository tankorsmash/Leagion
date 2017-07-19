import appUrls from 'main/app/urls';
let adminUrl = `${appUrls.index}/admin`;
let dashboardUrl = `${adminUrl}/dashboard`;

let leaguesUrl = `${adminUrl}/leagues`;
let seasonsUrl = `${adminUrl}/seasons`;
let locationsUrl = `${adminUrl}/locations`;
let teamsUrl = `${adminUrl}/teams`;
let matchesUrl = `${adminUrl}/matches`;
let playersUrl = `${adminUrl}/players`;

module.exports = {
	index: adminUrl,
    dashboard: {
        index: dashboardUrl,
        overview: `${dashboardUrl}/overview`,
        leagues: `${dashboardUrl}/leagues`,
        teams: `${dashboardUrl}/teams`,
        players: `${dashboardUrl}/players`,
    },
	leagues: {
		index: leaguesUrl,
		create: `${leaguesUrl}/create`,
		detail: `${leaguesUrl}/:leagueId`,
	},
	seasons: {
		index: seasonsUrl,
		create: `${seasonsUrl}/create`,
		detail: `${seasonsUrl}/:seasonId`,
	},
	locations: {
		index: locationsUrl,
		create: `${locationsUrl}/create`,
		detail: `${locationsUrl}/:locationId`,
	},
	teams: {
		index: teamsUrl,
		create: `${teamsUrl}/create`,
		detail: `${teamsUrl}/:teamId?`,
	},
	matches: {
		index: matchesUrl,
		create: `${matchesUrl}/create`,
		detail: `${matchesUrl}/:matchId`,
	},
	players: {
		index: playersUrl,
		create: `${playersUrl}/create`,
		detail: `${playersUrl}/:playerId`,
	},
}

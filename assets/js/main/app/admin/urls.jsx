import appUrls from 'main/app/urls';
let adminUrl = `${appUrls.index}/admin`;

let leaguesUrl = `${adminUrl}/leagues`;
let seasonsUrl = `${adminUrl}/seasons`;
let teamsUrl = `${adminUrl}/teams`;
let matchesUrl = `${adminUrl}/matches`;

module.exports = {
	index: adminUrl,
	leagues: {
		index: leaguesUrl,
		detail: `${leaguesUrl}/:leagueId?`,
	},
	seasons: {
		index: seasonsUrl,
		detail: `${seasonsUrl}/:seasonId?`,
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
}

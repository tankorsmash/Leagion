import appUrls from 'main/app/urls';
let adminUrl = `${appUrls.index}/admin`;

let leaguesUrl = `${adminUrl}/leagues`;
let teamsUrl = `${adminUrl}/teams`;
let matchesUrl = `${adminUrl}/matches`;

module.exports = {
	adminIndex: adminUrl,
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
}

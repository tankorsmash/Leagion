import playerUrls from 'main/app/player/urls';
let index = `${playerUrls.index}/team`;

module.exports = {
	index: index,
	detail: `${index}/:teamId?`,
    detailWide: `${index}/:teamId?*`,
    detailMatches: `${index}/:teamId?/matches`,
    detailTeamMembers: `${index}/:teamId?/team-members`,
    detailTeamDetails: `${index}/:teamId?/team-details`,
}


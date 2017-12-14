import appUrls from 'main/app/urls';
let index = `${appUrls.index}/admin`;

module.exports = {
    index: index,

    leagueIndex: `${index}/league`,

	seasonIndex: `${index}/league/:leagueId?/season`,
	seasonDetail: `${index}/league/:leagueId?/season/:seasonId?`,

};

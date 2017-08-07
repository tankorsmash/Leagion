import playerUrls from 'main/app/player/urls';
let index = `${playerUrls.index}/league`;

module.exports = {
	index: index,
	detail: `${index}/:leagueId?`,
};

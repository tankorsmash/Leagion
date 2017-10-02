import playerUrls from 'main/app/player/urls';
let index = `${playerUrls.index}/season`;

module.exports = {
	index: index,
	indexWide: `${index}/*`,
	detail: `${index}/:seasonId?`,
    detailSchedule: `${index}/:seasonId?/schedule`,
    detailRankings: `${index}/:seasonId?/rankings`,
}


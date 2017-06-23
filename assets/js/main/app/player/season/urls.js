import playerUrls from 'main/app/player/urls';
let index = `${playerUrls.index}/season`;

module.exports = {
	index: index,
	detail: `${index}/:seasonId?`,
}


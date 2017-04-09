import playerUrls from 'main/app/player/urls';
let index = `${playerUrls.index}/team`;

module.exports = {
	index: index,
	detail: `${index}/:teamId?`,
}


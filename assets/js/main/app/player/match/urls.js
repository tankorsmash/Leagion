import playerUrls from 'main/app/player/urls';
let index = `${playerUrls.index}/match`;

module.exports = {
	index: index,
	detail: `${index}/:matchId?`,
};


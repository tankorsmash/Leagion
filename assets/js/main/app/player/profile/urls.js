import playerUrls from 'main/app/player/urls';
let index = `${playerUrls.index}/profile`;

module.exports = {
	index: index,
	detail: `${index}/:playerId?`,
};


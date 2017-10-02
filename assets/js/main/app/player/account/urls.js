import playerUrls from 'main/app/player/urls';
let index = `${playerUrls.index}/account`;

module.exports = {
	index: index,
    profile: `${index}/profile`,
    changePassword: `${index}/change-password`,
};

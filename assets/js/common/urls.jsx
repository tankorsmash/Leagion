let rootUrl = '/main';
let appUrl = `${rootUrl}/app`;
let teamsUrl = `${appUrl}/teams`;

module.exports = {
	root: rootUrl,

	//registration
	login: `${rootUrl}/login`,
	register: `${rootUrl}/register`,

	//app
	app: {
		index: appUrl,
		teams: {
			index: teamsUrl
		},
		admin: {

		},
	}
}

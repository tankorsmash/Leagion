let root = '/main';
let app = `${root}/app`;
let teams = `${app}/teams`;

module.exports = {
	root: root,

	//registration
	login: `${root}/login`,
	register: `${root}/register`,

	//app
	app: {
		index: app,
		teams: {
			index: teams
		},
		admin: {

		},
	}
}

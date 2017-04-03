let rootUrl = '/main';
let appUrl = `${rootUrl}/app`;
let teamsUrl = `${appUrl}/teams`;
let matchesUrl = `${appUrl}/matches`;

let endOf = (path) => { return `${path}/`; };

module.exports = {
    root: `${rootUrl}`,

	//registration
	login: `${rootUrl}/login`,
	register: `${rootUrl}/register`,

	//app
	app: {
        tail: appUrl,
        index: endOf(appUrl),
		teams: {
			tail: endOf(teamsUrl),
			index: teamsUrl,
		},
		matches: {
			tail: endOf(matchesUrl),
			index: matchesUrl,
		},
		admin: {

		},
	}
}

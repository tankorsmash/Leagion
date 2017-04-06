let rootUrl = '/main';
let appUrl = `${rootUrl}/app`;
let teamsUrl = `${appUrl}/teams`;
let matchesUrl = `${appUrl}/matches`;

module.exports = {
    root: `${rootUrl}`,

    //registration
    login: `${rootUrl}/login`,
    register: `${rootUrl}/register`,

    //app
    app: {
        index: appUrl,
        teams: {
            index: teamsUrl,
        },
        matches: {
            index: matchesUrl,
            create: `${matchesUrl}/create`,
        },
        admin: {

        },
    }
}

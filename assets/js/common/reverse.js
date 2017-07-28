
//Generated File
//Do not modify by hand, it will get overwritten
//see leagion reverse_js for what you want
var viewnames = {
    "api-league-detail": "/api/league/<league_id>/",
    "api-league-list": "/api/league/",
    "api-league-season-list": "/api/league/<league_id>/seasons/",
    "api-location-detail": "/api/location/<location_id>/",
    "api-location-list": "/api/location/",
    "api-match-detail": "/api/match/<match_id>/",
    "api-match-list": "/api/match/",
    "api-my-details": "/api/me/",
    "api-my-league-detail": "/api/me/league/<league_id>/",
    "api-my-league-list": "/api/me/league/",
    "api-my-season-detail": "/api/me/season/<season_id>/",
    "api-my-season-list": "/api/me/season/",
    "api-my-team-list": "/api/me/team/",
    "api-player-detail": "/api/player/<player_id>/",
    "api-player-list": "/api/player/",
    "api-roster-detail": "/api/roster/<roster_id>/",
    "api-roster-list": "/api/roster/",
    "api-season-detail": "/api/season/<season_id>/",
    "api-season-list": "/api/season/",
    "api-set-match-score": "/api/set-match-score/<match_id>/",
    "api-stats-index": "/api/stats/",
    "api-team-detail": "/api/team/<team_id>/",
    "api-team-list": "/api/team/",
    "rest_login": "/lin/",
    "rest_logout": "/lout/",
    "rest_password_change": "/pswdchg/",
    "rest_password_reset": "/pswdrst/",
    "rest_password_reset_confirm": "/pswdrstcfm/",
    "rest_register": "/rgstr/",
    "rest_verify_email": "/vrfyeml/"
};

function reverse(urlname, kwargs) {
    var url = viewnames[urlname];
    kwargs = kwargs || {};

    if (url === undefined) {
        throw 'reverse failed. Incorrect urlname: ' + urlname;
    }

    for(var kwarg in kwargs) {
        var value = kwargs[kwarg];
        url = url.replace('<' + kwarg + '>', value);
    }
    if (url.includes('<')) {
        throw 'reverse failed. Missing kwargs. urlname: ' + urlname + '. kwargs: ' + JSON.stringify(kwargs) + '. url: ' + url;
    }
    return url;
}

module.exports = reverse;

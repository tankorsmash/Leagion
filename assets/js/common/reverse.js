
//Generated File
//Do not modify by hand, it will get overwritten
//see leagion reverse_js for what you want
var viewnames = {
    "api-invite-user": "/api/invite-player/",
    "api-my-comm-league-detail": "/api/me/comm/league/<league_id>/",
    "api-my-comm-league-list": "/api/me/comm/league/",
    "api-my-comm-location-detail": "/api/me/comm/location/<location_id>/",
    "api-my-comm-location-list": "/api/me/comm/location/",
    "api-my-comm-match-detail": "/api/me/comm/match/<match_id>/",
    "api-my-comm-match-list": "/api/me/comm/match/",
    "api-my-comm-player-detail": "/api/me/comm/player/<player_id>/",
    "api-my-comm-player-list": "/api/me/comm/player/",
    "api-my-comm-season-detail": "/api/me/comm/season/<season_id>/",
    "api-my-comm-season-list": "/api/me/comm/season/",
    "api-my-comm-team-detail": "/api/me/comm/team/<team_id>/",
    "api-my-comm-team-list": "/api/me/comm/team/",
    "api-my-details": "/api/me/",
    "api-my-league-detail": "/api/me/league/<league_id>/",
    "api-my-league-list": "/api/me/league/",
    "api-my-match-detail": "/api/me/match/<match_id>/",
    "api-my-match-list": "/api/me/match/",
    "api-my-public-player-detail": "/api/public-player/<player_id>/",
    "api-my-role": "/api/me/role/",
    "api-my-season-detail": "/api/me/season/<season_id>/",
    "api-my-season-list": "/api/me/season/",
    "api-my-team-detail": "/api/me/team/<team_id>/",
    "api-my-team-list": "/api/me/team/",
    "api-player-commissioner-add": "/api/player/<player_id>/commissioner-add/",
    "api-player-commissioner-remove": "/api/player/<player_id>/commissioner-remove/",
    "api-roster-detail": "/api/roster/<roster_id>/",
    "api-roster-list": "/api/roster/",
    "api-set-match-score": "/api/set-match-score/<match_id>/",
    "api-site-constants": "/api/site-constants/",
    "api-stats-index": "/api/stats/",
    "api-team-players-add": "/api/team/<team_id>/add-players/",
    "api-team-players-remove": "/api/team/<team_id>/remove-players/",
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

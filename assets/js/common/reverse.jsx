
//Generated File
//Do not modify by hand, it will get overwritten
//see leagion reverse_js for what you want
var viewnames = {
    "api-match-detail": "/api/match/<match_id>/",
    "api-match-list": "/api/match/",
    "api-player-detail": "/api/player/<player_id>/",
    "api-player-list": "/api/player/",
    "rest_login": "/lin/",
    "rest_logout": "/lout/",
    "rest_password_change": "/pswdchg/",
    "rest_password_reset": "/pswdrst/",
    "rest_password_reset_confirm": "/pswdrstcfm/",
    "rest_register": "/rgstr/",
    "rest_user_details": "/usrdtls/",
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
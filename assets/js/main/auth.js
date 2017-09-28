let auth = {
    login: function(token) {
        localStorage.token = token;
    },

    logout: function() {
        localStorage.clear();
    },

    loggedIn: function() {
        return !!localStorage.token;
    },

    commissionerOrBetter: function(user) {
        return user.is_commissioner || user.is_moderator || user.is_staff;
    },

    moderatorOrBetter: function(user) {
        return user.is_moderator || user.is_staff;
    },
}

module.exports = auth;

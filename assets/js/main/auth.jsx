let auth = {
    login: function(token) {
        localStorage.token = token;
    },

    logout: function() {
        localStorage.clear();
    },

    loggedIn: function() {
        return !!localStorage.token;
    }
}

module.exports = auth;

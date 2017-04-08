let auth = {
    login: function(token) {
        localStorage.logged_in = true;
    },

    logout: function() {
        localStorage.clear();
    },

    loggedIn: function() {
        return !!localStorage.logged_in;
    }
}

module.exports = auth;

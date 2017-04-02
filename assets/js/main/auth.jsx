let auth = {
    login: function(token) {
        localStorage.logged_in = true;
    },

    logout: function() {
        delete localStorage.logged_in;
    },

    loggedIn: function() {
        return !!localStorage.logged_in;
    }
}

module.exports = auth;

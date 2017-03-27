module.exports = {
    login: function(token) {
        localStorage.token = token;
    },        
    
    logout: function() {
        delete localStorage.token
    },

    loggedIn: function() {
        return !!localStorage.token
    },
}

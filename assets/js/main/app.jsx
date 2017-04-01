import React from 'react';
import {auth} from 'main/registration'

module.exports = React.createClass({
   getInitialState: function() {
        return {'user':[]}
    },

    componentDidMount: function() {
        this.loadUserData()
    },
            
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },

    logoutHandler: function() {
        auth.logout()
    },

    loadUserData: function() {
       //fetch(reverse('rest_register'),
          //fetchInfo
       //).then(function(response) {
          //console.log(response);
       //}).catch(function(err) {
          //console.log(err);
       //});
        //$.ajax({
            //method: 'GET',
            //url: '/api/users/i/',
            //datatype: 'json',
            //headers: {
                //'Authorization': 'Token ' + localStorage.token
            //},
            //success: function(res) {
                //this.setState({user: res})
            //}.bind(this)
        //})
    },

    render: function() {
        return (
            <div>
            <h1>You are now logged in, {this.state.user.username}</h1>
            <button onClick={this.logoutHandler}>Log out</button>
            </div>
        )        
    }
})

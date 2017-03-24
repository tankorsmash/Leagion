import React from 'react';
import ReactDOM from 'react-dom';
import {Login} from 'public/login';

class Public extends React.Component {
    render() {
        return (
            <Login/>
        );
    }
}

ReactDOM.render(<Public/>, document.getElementById('root'));


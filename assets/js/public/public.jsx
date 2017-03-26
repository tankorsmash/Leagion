import React from 'react';
import ReactDOM from 'react-dom';
import {LoginForm, RegisterForm} from 'public/registration';

class Public extends React.Component {
    render() {
        return (
            <RegisterForm/>
        );
    }
}

ReactDOM.render(<Public/>, document.getElementById('root'));


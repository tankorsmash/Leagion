import React from 'react';
import ReactDOM from 'react-dom';
import {Navigation} from 'common/nav';

console.log(Navigation);

class Main extends React.Component {
    render() {
        return (
			<Navigation/>
        );
    }
}

ReactDOM.render(<Main/>, document.getElementById('root'));


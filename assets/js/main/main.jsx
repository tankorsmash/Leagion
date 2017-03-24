import React from 'react';
import ReactDOM from 'react-dom';
import {Navigation} from 'components/nav';

class Main extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
			<Navigation/>
        );
    }
}

ReactDOM.render(<Main/>, document.getElementById('root'));

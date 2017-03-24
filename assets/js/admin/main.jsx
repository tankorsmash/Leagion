import React from 'react';
import ReactDOM from 'react-dom';
import { Badge } from 'reactstrap';

class Main extends React.Component {
  render() {
    return (
      <div>
        <h1>Heading <Badge>New</Badge></h1>
        <h2>Heading <Badge>New</Badge></h2>
        <h3>Heading <Badge>New</Badge></h3>
        <h4>Heading <Badge>New</Badge></h4>
        <h5>Heading <Badge>New</Badge></h5>
        <h6>Heading <Badge>New</Badge></h6>
      </div>
    );
  }
}

ReactDOM.render(<Main/>, document.getElementById('root'));


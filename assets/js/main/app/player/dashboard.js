import {
    Container, Row, Col, Jumbotron, Button,
    Card, CardImg, CardText, CardBlock, CardTitle, CardSubtitle
} from 'reactstrap';

import ajax from 'common/ajax';

import {TeamList} from 'main/app/player/team/base';

class Dashboard extends React.Component {
   render() {
      return (
         <TeamList/>
      );
   }
}

module.exports = Dashboard;

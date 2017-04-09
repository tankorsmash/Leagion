import {
    Container, Row, Col, Jumbotron, Button,
    Card, CardImg, CardText, CardBlock, CardTitle, CardSubtitle
} from 'reactstrap';

import ajax from 'common/ajax';

import {LeagueList} from 'main/app/player/league/base';

class Dashboard extends React.Component {
   render() {
      return (
         <LeagueList/>
      );
   }
}

module.exports = Dashboard;

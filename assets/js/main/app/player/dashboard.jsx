import {
    Container, Row, Col, Jumbotron, Button,
    Card, CardImg, CardText, CardBlock, CardTitle, CardSubtitle
} from 'reactstrap';

import ajax from 'common/ajax';

class LeagueListItem extends React.Component {
    render() {
        let league = this.props.match;
        return (

            <div>
            </div>
        );
    }
}

//class LeagueList extends React.Component {
    //constructor(props){
        //super(props);
        //this.state = { matches: [] };
    //}

    //render() {
        //return (
            //<div>
                //this is the list of matches
                //{ this.state.matches.map((match)=>{
                    //return <Match
                        //match={match}
                        //key={match.id}
                    ///>
                //}) }
            //</div>
        //);
    //}

    //componentDidMount() {
        //this.updateDataset();
    //}

    //updateDataset() {
        //let url = reverse('api-me-match-list');

        //ajax({
            //url: url,
        //}).then(data => {
            //this.setState(data);
        //});
    //}
//}

class Dashboard extends React.Component {
   render() {
      return (
         <Row>
            Player Dashboard
         </Row>
      );
   }
}

module.exports = Dashboard;

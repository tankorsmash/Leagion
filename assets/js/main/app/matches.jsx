class Match extends React.Component {
   render(props) {
      return (
         <div>
            this is a match
            <div>
                Match name: NAME
            </div>
            <div>
                Match location: LOCATION
            </div>
         </div>
      );
   }
}

class Matches extends React.Component {
    render() {
        let matches = [];
        for (var i=0; i < 10; i++){
            matches.push(<Match key={i}/>);
        };

        return (
            <div>
                this is the list of matches
                {matches}
            </div>
        );
    }
}

module.exports = Matches;

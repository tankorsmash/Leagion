function getRandomInt(min, max) {
    //min and max inclusive
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

class Match extends React.Component {
   render() {
      return (
         <div className="mt-3">
            <div>
                Match name: { this.props.name }
            </div>
            <div>
                Match location: { this.props.location }
            </div>
            <div>
                home score: { this.props.home_score }
            </div>
            <div>
                away score: { this.props.away_score }
            </div>
         </div>
      );
   }
}

class Matches extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            matches: []
        };

        [...Array(10)].fill().map(()=> { //for _ in range(10):
            let match = {
                name: "--MATCH_NAME",
                location: "--MATCH_LOCATION",
                home_score: getRandomInt(0, 25),
                away_score: getRandomInt(4, 20),
            }
            this.state.matches.push(match);
        });
    }
    render() {
        return (
            <div>
                this is the list of matches
                { this.state.matches.map((match)=>{
                    return <Match
                        name= {match.name}
                        location= {match.location}
                        home_score= {match.home_score}
                        away_score= {match.away_score}
                    />
                }) }
            </div>
        );
    }
}

module.exports = Matches;

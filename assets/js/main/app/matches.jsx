import ajax from 'common/ajax';

function getRandomInt(min, max) {
    //min and max inclusive
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


class Match extends React.Component {
    render() {
        let match = this.props.match;
        return (
            <div className="mt-3">
                <h2>
                    Match name: { match.pretty_name }
                </h2>
                <div>
                    Match location: { match.location }
                </div>
                <div>
                    home points: { match.home_points }
                </div>
                <div>
                    away points: { match.away_points }
                </div>
                <div>
                   duration: { match.duration_seconds }
                </div>
            </div>
        );
    }
}

class Matches extends React.Component {
    constructor(props){
        super(props);
        this.state = { matches: [] };
    }

    render() {
        return (
            <div>
                this is the list of matches
                { this.state.matches.map((match)=>{
                    return <Match
                        match={match}
                        key={match.id}
                    />
                }) }
            </div>
        );
    }

    componentDidMount() {
      ajax({
         url: reverse('api-match-list'),
      }).then(data => {
          this.setState({matches: data});
      });
    }
}

module.exports = Matches;

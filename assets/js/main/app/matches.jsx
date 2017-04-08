import ajax from 'common/ajax';
import urls from 'common/urls';

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
        this.updateDataset();
    }

    updateDataset() {
        let url = reverse('api-match-list');

        if (typeof this.props.match.params.matchId != "undefined") {
            url = url+this.props.match.params.matchId;
        };

        ajax({
            url: url,
        }).then(data => {
            //if there's only one object, its a single detail match, so arrayify it
            this.setState({matches: Array.isArray(data) ? data : [data]});
        });
    }
}

module.exports = Matches;

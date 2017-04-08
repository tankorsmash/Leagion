import {BrowserRouter as Router, Switch} from 'react-router-dom';
import {Route} from 'components/router';

import ajax from 'common/ajax';
import urls from 'common/urls';

function getRandomInt(min, max) {
    //min and max inclusive
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// class MatchesCreate extends React.Component {
//     render() {
//         return (
//             <div className="">
//                 This is MatchesCreate
//             </div>
//         );
//     }
// }

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

        ajax({
            url: url,
        }).then(data => {
            this.setState(data);
        });
    }
}

// class Matches extends React.Component {
//     render() {
//         return (
// 			<Switch>
// 				<Route exact path={urls.app.matches.create} component={MatchesCreate} />
// 				<Route path={urls.app.matches.index} component={MatchesList} />
// 			</Switch>
//         );
//     }
//
// }

module.exports = Matches;

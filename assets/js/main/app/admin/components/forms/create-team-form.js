import {
    Form, FormGroup, Input, Dropdown, Label,
} from 'reactstrap';

import DatasetView from 'components/dataset_view';

class LeagueSelectInput extends DatasetView {
    get datasetStateAttr() {
        return "leagues";
    }

    get datasetViewName() {
        return "api-league-list";
    }

    render() {
        let options = [];
        if (this.getIsLoaded() == false) {
            options.push(<option key={0}> Loading Leagues</option>);
        } else {
            options.push(<option value="-1" key="-1">Select a league</option>);

            this.state.leagues.map((league) => {
                options.push(<option value={league.id} key={league.id}> {league.name}</option>);
            });
        }
        return (
            <Input
                type="select"
                onChange={this.props.handleInputChange}
                value={this.props.leagueId}
                name="leagueId"
                id="leagueId" >
                { options }
            </Input>
        );
    }
}

class SeasonSelectInput extends DatasetView {
    get datasetStateAttr() {
        return "seasons";
    }

    get datasetViewName() {
        return "api-season-list";
    }

    render() {
        let options = [];

        //if initial state of modal
        if (this.props.leagueId == "-1") {
            options.push(<option key={0}>Select a league</option>);
        //else if waiting for api
        } else if (this.getIsLoaded() == false) {
            options.push(<option key={0}> Loading Seasons</option>);
        // otherwise ready to go, select a season
        } else {
            const filteredSeasons = this.state.seasons.filter((season) => {
                return season.league_id == this.props.leagueId
            });

            if (filteredSeasons.length == 0) {
                options.push(<option value="-1" key="-1">Must first create a season in league</option>);
            } else {
                options.push(<option value="-1" key="-1">Select a season</option>);

                filteredSeasons.map((season) => {
                    if (season.league_id == this.props.leagueId) {
                        options.push(<option value={season.id} key={season.id}> {season.pretty_name}</option>);
                    };
                });
            };

        }

        return (
            <Input
                type="select"
                onChange={this.props.handleInputChange}
                value={this.props.season_id}
                name="season_id"
                id="season_id" >
                { options }
            </Input>
        );
    }
}


export default class TeamCreateForm extends React.Component {
    render() {
        let formData = this.props.formData;
        return (
            <Form onSubmit={this.props.handleSubmit} >
                <FormGroup>
                    <Label for="name">Team name:</Label>
                    <Input
                        onChange={this.props.handleInputChange}
                        value={formData.name}
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Sports Team Three"/>
                </FormGroup>
                <FormGroup>
                    <Label for="name">League:</Label>
                    <LeagueSelectInput
                        handleInputChange={this.props.handleInputChange}
                        value={formData.leagueId}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="name">Season:</Label>
                    <SeasonSelectInput
                        handleInputChange={this.props.handleInputChange}
                        leagueId={formData.leagueId}
                        value={formData.season_id}
                    />
                </FormGroup>
            </Form>
        );
    }
}


